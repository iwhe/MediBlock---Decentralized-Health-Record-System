import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Web3 from "web3";
import contract from "../contracts/contract.json";
import { useCookies } from "react-cookie";
// import { Box, Typography } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
import "./Login.css";
import logosvg from "../data/logo.svg";

const Login = () => {
  const [type, setType] = useState(false);
  const [doctors, setDoc] = useState([]);
  const [patients, setPatient] = useState([]);
  const [cookies, setCookie] = useCookies([]);

  const [log, setLog] = useState({
    mail: "",
    password: "",
  });

  const web3 = new Web3(window.ethereum);
  const mycontract = new web3.eth.Contract(
    contract["abi"],
    contract["address"]
  );

  function handle(e) {
    const newData = { ...log };
    newData[e.target.name] = e.target.value;
    setLog(newData);
  }

  async function loadDoctors() {
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
      .getdata()
      .call()
      .then((res) => {
        res.map((data) => {
          data = JSON.parse(data);
          if (data["type"] === "doctor") {
            doctors.push(data);
          }
        });
        setCookie("doctors", doctors);
      });
  }

  function resetCook(val, data) {
    var list = [];
    for (let j = 1; j < data.length; j++) {
      list.push(data[j]);
    }
    setCookie(val, list);
  }

  async function login(e) {
    var accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var currentaddress = accounts[0];

    if (!e) {
      // patient
      var pats = [];
      const vis = [];
      await mycontract.methods
        .getPatient()
        .call()
        .then(async (res) => {
          for (let i = res.length - 1; i >= 0; i--) {
            const data = await (
              await fetch(`http://localhost:8080/ipfs/${res[i]}`)
            ).json();
            if (!vis.includes(data.mail)) {
              vis.push(data.mail);
              pats.push(res[i]);
            }
          }
        });

      let flag = 0;
      pats.map(async (data) => {
        await fetch(`http://localhost:8080/ipfs/${data}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.mail === log.mail) {
              if (res.password === log.password) {
                console.log(data);
                setCookie("hash", data);
                setCookie("type", "patient");
                alert("Logged in");
                window.location.href = "/myprofile";
              } else {
                alert("Wrong Password");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      // doctor
      var docs = [];
      await mycontract.methods
        .getDoctor()
        .call()
        .then((res) => {
          res.map((d) => {
            docs.push(d);
          });
        });

      let flag = 0;
      docs.map((data) => {
        fetch(`http://localhost:8080/ipfs/${data}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.mail === log.mail) {
              if (res.password === log.password) {
                setCookie("hash", data);
                setCookie("type", "doctor");
                alert("Logged in");
                window.location.href = "/myprofiledoc";
              } else {
                alert("Wrong Password");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }

  async function show() {
    mycontract.methods
      .getdata()
      .call()
      .then((res) => {
        res.map((d) => {
          console.log(JSON.parse(d));
        });
      });
  }

  return (
    <div className="login-container">
      <form className="login-form backdrop-blur-lg
               [ p-8 md:p-10 lg:p-10 ]
               [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl ]"
               xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={6}
      minHeight={550}
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
      
      >
        <h2 className="login-form-title">Log In</h2>
        <div className="input-container">
          <div className="input-div">
            <div className="input-heading">
              <i className="fas fa-user"></i>
              <h5>Email</h5>
            </div>
            <input
              onChange={(e) => handle(e)}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="mail"
            />
          </div>
          <div className="input-div">
            <div className="input-heading">
              <i className="fas fa-lock"></i>
              <h5>Password</h5>
            </div>
            <input
              onChange={(e) => handle(e)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
          </div>
          <div className="input-div">
            <div className="input-heading" style={{ margin: "1rem 0" }}>
              <i className="fas fa-key"></i>
              <h5>User Type</h5>
           
              <select id="user-type" name="type" onChange={() => { setType(!type) }} style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: '#7aa74a', color: '#fafafa' }}>
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
               </select>
            </div>
          </div>
          <p style={{ textAlign: "right" }}>Forgot password?</p>
        </div>

        <input
          type="button"
          className="btn"
          value="Log In"
          onClick={() => {
            login(type);
          }}
        />
        <p style={{ textAlign: "right" }}>
          Don't have an account?
          <Link
            style={{
              marginLeft: "4px",
              color: "black",
              textDecoration: "underline",
            }}
            to="/signup"
          >
            Sign Up.
          </Link>
        </p>
      </form>

      <div className="login-element">
      {/* <div className="grid" xs={0} sm={0} md={6} lg={6} xl={6} minHeight={550}> */}
      <div className="box"
        sx={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 255, 60, 0.3) , rgba(0, 157, 255, 0.3))`,
          padding: "20px",
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex',
            lg: 'flex', 
            xl: 'flex'
          },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          borderRadius: "0px 30px 30px 0",
        }}
      >
        <div
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <h4 className="Typegraphy" variant="h4" fontWeight="bold" color="whitesmoke" mb={3}>
            Welcome to Our Community
          </h4>
          <div className="body1" fontWeight="" color="whitesmoke">
            Be a part of Blockchain Network in Electronic Health Record System!
          </div>
      </div>
    </div>

    <div className="login-img">
    <img className="blockchain-img" src={logosvg} />
    </div>

      </div>
    </div>

  );
};

export default Login;
