import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar2 from "../components/Sidebar2";
import Footer from "../components/Footer";
import { useCookies } from "react-cookie";
import Web3 from "web3";
import contract from "../contracts/contract.json";

import avatar from "../data/avatar.png";
const MyProfileDoc = () => {
  const [cookies, setCookie] = useCookies();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [licenseno, setLicenseno] = React.useState("");
  // const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const web3 = new Web3(window.ethereum);
  const mycontract = new web3.eth.Contract(
    contract["abi"],
    contract["address"]
  );

  useEffect(() => {
    const hash = cookies["hash"];
    fetch(`http://localhost:8080/ipfs/${hash}`)
      .then((res) => res.json())
      .then((res) => {
        setName(res.name);
        setEmail(res.mail);
        setPassword(res.password);
        setLicenseno(res.license);
      });
  });

  const [auth, setAuth] = useState({
    type: "user",
    name: name,
    mail: email,
    password: password,
  });

  const [disabled, setDisabled] = useState(true);

  function handleGameClick() {
    setDisabled(!disabled);
  }

  async function save() {
    setCookie("name", name);
    setCookie("mail", email);
    setCookie("password", password);
    setCookie("licenseno", licenseno);
    var accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var currentaddress = accounts[0];

    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
      contract["abi"],
      contract["networks"]["5777"]["address"]
    );
    // console.log(mycontract);
    mycontract.methods
      .updateData(parseInt(cookies["index"]), JSON.stringify(auth))
      .send({ from: currentaddress })
      .then((res) => {
        console.log(res);
      });
  }

  async function show() {
    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
      contract["abi"],
      contract["networks"]["5777"]["address"]
    );
    mycontract.methods
      .getdata()
      .call()
      .then((res) => {
        res.map((data) => {
          var d = JSON.parse(data);
          console.log(d);
        });
      });
  }

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
        <Sidebar2 />
      </div>

      <div
        className={
          "dark:bg-main-dark-bg  bg-main-bg min-h-screen ml-72 w-full  "
        }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full r-0">
          <Navbar />
        </div>
        <div className="flex justify-center m-10 ">
          <form className="
               [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl ]"
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
            backgroundColor: "rgb(3, 201, 215)"}}
            > 
            <h1 style={{padding:'10px',textTransform: "uppercase", fontSize:'1.5rem'}} className="text-center text-lg">Doctors Profile</h1>
            <div className="ProfileContainer flex row align-center" style={{  justifyContent:'space-between' , padding:"1.5rem"}}>
      
              <div className="profilePicture col-xl-4 col-md-4" style={{
                width:'300px',
                height: '300px',
                borderRadius: '150px',
                border:  '1px solid #C471ED',
                backgroundColor: "#7ED957",
                display: 'inline-block',
                marginRight: '1.5em',
              }}>
                <img  src={avatar} alt="profile-picture" />
              </div>
              <div className="col-xl-6 col-md-6 flex  row gap-y-8 profileDetails">
                <div className="py-2">
                  <label className="text-black">
                    Name:
                    <input
                      id="inp"
                      style={{
                        padding: "10px",
                        margin: "10px",
                        color: "black",
                      }}
                      name="email"
                      type="email"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={disabled}
                      required
                    />
                  </label>
                  <input
                    type="button"
                    value="✎"
                    onClick={handleGameClick}
                  ></input>
                </div>

                <div className="py-2">
                  <label className="text-black">
                    Email:
                    <input
                      id="inp"
                      style={{ padding: "10px", margin: "10px" }}
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={disabled}
                      required
                    />
                  </label>
                  <input
                    type="button"
                    value="✎"
                    onClick={handleGameClick}
                  ></input>
                </div>

                <div className="py-2">
                  <label className="text-black">
                    Password:
                    <input
                      style={{ padding: "10px", margin: "10px" }}
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={disabled}
                      required
                    />
                  </label>
                  <input
                    type="button"
                    value="✎"
                    onClick={handleGameClick}
                  ></input>
                </div>

                <div className="py-2">
                  <label className="text-black">
                    License No.:
                    <input
                      style={{ padding: "10px", margin: "10px" }}
                      name="licenseno"
                      type="number"
                      value={licenseno}
                      onChange={(e) => setLicenseno(e.target.value)}
                      disabled={disabled}
                      required
                    />
                  </label>
                  <input
                    type="button"
                    value="✎"
                    onClick={handleGameClick}
                  ></input>
                </div>

                <div className="py-2">
                  <input
                    type="button"
                    value="Save"
                    onClick={save}
                    className="bg-blue-400 text-white font-medium p-3 border-radius-4"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MyProfileDoc;
