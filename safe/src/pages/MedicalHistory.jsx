import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import Web3 from "web3";
import PatNavbar from "../components/PatientNav";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { MdDeleteForever } from "react-icons/md";
import contract from "../contracts/contract.json";
import { useCookies } from "react-cookie";
import { create } from 'ipfs-http-client'

const MedicalHistory = () => {
  const web3 = new Web3(window.ethereum);
  const mycontract = new web3.eth.Contract(
    contract["abi"],
    contract["address"]
  );
  const [cookies, setCookie] = useCookies();
  const [medHistory, setMedHistory] = useState([]);

  useEffect(() => {
    const all = [];
    async function getAll() {
      await mycontract.methods
        .getPatient()
        .call()
        .then(async (res) => {
          for (let i = res.length - 1; i >= 0; i--) {
            if (res[i] === cookies['hash']) {
              const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json();
              all.push(data.medicalhistory);
              break;
            }
          }
        });

        setMedHistory(all);
    }
    getAll();
    return;
  }, [medHistory.length]);


  const [addFormData, setAddFormData] = useState({
    disease: "",
    time: "",
    solved: "",
  });

  const handleAddFormChange = (event) => {
    const newFormData = { ...addFormData };
    newFormData[event.target.name] = event.target.value;
    setAddFormData(newFormData);
  };


  async function submit() {
    var accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var currentaddress = accounts[0];

    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
      contract["abi"],
      contract["address"]
    );

    mycontract.methods
      .getPatient()
      .call()
      .then(async (res) => {
        for (let i = res.length - 1; i >= 0; i--) {
          if (res[i] === cookies['hash']) {
            const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json();
            const all  = data.medicalhistory;
            all.push(addFormData);
            data.medicalhistory =all;
  
            let client = create();
            client = create(new URL('http://127.0.0.1:5001'));
            const { cid } = await client.add(JSON.stringify(data));
            const hash = cid['_baseCache'].get('z');

            await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
              setCookie('hash', hash);
              alert("Medical Record Added");
              window.location.reload();
            }).catch((err) => {
              console.log(err);
            })
          }
        }
      });
  }

  async function del(name) {
    var accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var currentaddress = accounts[0];

    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
      contract["abi"],
      contract["address"]
    );

    mycontract.methods.getPatient().call().then(async (res) => {
      for (let i = res.length - 1; i >= 0; i--) {
        if (res[i] === cookies['hash']) {
          const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json();
          const alls = data.medicalhistory;
          const newList = [];
          for (let i = 1; i < alls.length; i++) {
            if (alls[i].disease === name) {
              continue;
            }
            else {
              newList.push(alls[[i]]);
            }
          }
          data.medHistory = newList;

          let client = create();
          client = create(new URL('http://127.0.0.1:5001'));
          const { cid } = await client.add(JSON.stringify(data));
          const hash = cid['_baseCache'].get('z');

          await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
            setCookie('hash', hash);
            alert("Deleted");
            window.location.reload();
          }).catch((err) => {
            console.log(err);
          })
        }
      }
    })
  }

  function showHistory() {
    if (medHistory.length > 0) {
      return medHistory[0].map(data => {
        return (
          <tr>
            <td>{data.disease}</td>
            <td>{data.time}</td>
            <td>{data.solved}</td>
            {/* <td>
              <input type="button" value="Delete"  style={{color:"#e00"}} onClick={() => del(data.disease)} />
            </td> */}
            <td>
              <button value="Delete" onClick={() => del(data.disease)}>
              < MdDeleteForever/>
                </button>
            </td>
          </tr>
        )
      })
    }
  }
  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
        <Sidebar />
      </div>

      <div
        className={
          "dark:bg-main-dark-bg  bg-main-bg min-h-screen ml-72 w-full  "
        }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          <PatNavbar />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", padding: "4rem", justifyContent: "center", alignItems: "flex-end", gap: "4rem" }}
        >
          <form className="
               [ bg-gradient-to-b from-white/60 to-white/30 ]
              "
            xs={12} sm={12} md={6} lg={6}  xl={6} 
            sx={{
              boxShadow: {
                xs: "",
                sm: "",
                md: "15px 2px 5px -5px",
                lg: "15px 2px 5px -5px",
                xl: "15px 2px 5px -5px",
              },
              borderRadius: {
                xs: "30px",
                sm: "30px",
                md: "30px 0 0 30px",
                lg: "30px 0 0 30px",
                xl: "60px 0px 0px 60px",
              },
            }} style={{ width: "100%", borderRadius: "30px 30px 0px 0px", gap: "1rem",
            backgroundColor: "rgb(3, 201, 215)"}}>
               <h1
              style={{
                padding: "10px",
                textTransform: "uppercase",
                fontSize: "1.5rem",
              }}
              className="text-center text-lg"
            >Medical Emergency</h1>
               {/* <h2 style={{padding:'10px',textTransform: "uppercase", fontSize:'1.5rem'}}>Medical Emergency:</h2> */}
            <table style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="">Disease</th>
                  <th className="">Diagnosed Date</th>
                  <th className="">Status</th>
                </tr>
              </thead>
              <tbody>
                {showHistory()}
              </tbody>
            </table>
          </form>

          <form  className=" backdrop-blur-lg
               [ p-8 md:p-10 lg:p-10 ]
               [ bg-gradient-to-b from-white/60 to-white/30 ]
             "
            xs={12} sm={12} md={6} lg={6}  xl={6}   minHeight={550}
            sx={{
              boxShadow: {
                xs: "",
                sm: "",
                md: "15px 2px 5px -5px",
                lg: "15px 2px 5px -5px",
                xl: "15px 2px 5px -5px",
              },
              borderRadius: {
                xs: "30px",
                sm: "30px",
                md: "30px 0 0 30px",
                lg: "30px 0 0 30px",
                xl: "30px 0 0 30px",
              },
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              backgroundColor: "rgb(3, 201, 215)",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px",
              borderRadius: "20px",
            }} >
            <h2>Add your Medical History</h2>
            <input
              type="text"
              name="disease"
              required="required"
              placeholder="Disease"
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="time"
              required="required"
              placeholder="Diagnosed Date"
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="solved"
              required="required"
              placeholder="Treated/Ongoing"
              onChange={handleAddFormChange}
            />
            <input type="button" value="Save" onClick={submit} />
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MedicalHistory;
