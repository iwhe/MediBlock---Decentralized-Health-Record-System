import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import Web3 from "web3";
import PatNavbar from "../components/PatientNav";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import contract from "../contracts/contract.json";
import { useCookies } from "react-cookie";
import { MdDelete } from "react-icons/md";
import { create } from 'ipfs-http-client'

const Insurance = () => {
  const web3 = new Web3(window.ethereum);
  const mycontract = new web3.eth.Contract(
    contract["abi"],
    contract["address"]
  );
  const [cookies, setCookie] = useCookies();
  const [insurances, setInsurance] = useState([]);

  useEffect(() => {
    const ins = [];
    async function getIns() {
      await mycontract.methods
        .getPatient()
        .call()
        .then(async (res) => {
          for (let i = res.length - 1; i >= 0; i--) {
            if (res[i] === cookies['hash']) {
              const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json();
              ins.push(data.insurance);
              break;
            }
          }
        });
        // console.log(ins);
      setInsurance(ins);
    }
    getIns();
    return;
  }, [insurances.length]);


  const [addFormData, setAddFormData] = useState({
    company: "",
    policyNo: "",
    expiry: "",
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

    mycontract.methods
      .getPatient()
      .call()
      .then(async (res) => {
        for (let i = res.length - 1; i >= 0; i--) {
          if (res[i] === cookies['hash']) {
            const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json();
            const ins = data.insurance;
            ins.push(addFormData);

            data.insurance = ins;
            let client = create();
            client = create(new URL('http://127.0.0.1:5001'));
            const { cid } = await client.add(JSON.stringify(data));
            const hash = cid['_baseCache'].get('z');

            await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
              setCookie('hash', hash);
              alert("Insurance Added");
              window.location.reload();
            }).catch((err) => {
              console.log(err);
            })
          }
        }
      });
  }


  async function del(policy) {
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
          const alls = data.insurance;
          const newList = [];
          for (let i = 1; i < alls.length; i++) {
            if (alls[i].policyNo === policy) {
              continue;
            }
            else {
              newList.push(alls[[i]]);
            }
          }
          data.insurance = newList;

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

  function showInsurances() {
    if (insurances.length > 0) {
      return insurances[0].map(data => {
        return (
          <tr>
            <td style={{fontWeight:"bold"}}>{data.company}</td>
            <td>{data.policyNo}</td>
            <td>{data.expiry}</td>
            <td>
              <button onClick={() => del(data.policyNo)}>
              <MdDelete />
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
                xl: "60px 60px 60px 60px",
              },
            }} style={{ width: "100%",
            borderRadius: "20px 20px 0px 0px",  gap: "1rem",
            backgroundColor: "rgb(3, 201, 215)"}}> 
            <h1
              style={{
                padding: "10px",
                textTransform: "uppercase",
                fontSize: "1.5rem",
              }}
              className="text-center text-lg"
            >Register your insurance</h1>
            {/* <h2 style={{padding:'10px',textTransform: "uppercase", fontSize:'1.5rem'}}>Register your insurance:</h2> */}
            <table style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="">Company</th>
                  <th className="">Policy Number</th>
                  <th className="">Expiry</th>
                  <th className="">Actions</th>
                </tr>
              </thead>
              <tbody>
                {showInsurances()}
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
              borderRadius: "20px 0px 0px 20px",
            }} >
            <h2>Add an Insurance</h2>
            <input
              type="text"
              name="company"
              required="required"
              placeholder="Company"
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="policyNo"
              required="required"
              placeholder="Policy No."
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="expiry"
              required="required"
              placeholder="Expiry Date"
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

export default Insurance;
