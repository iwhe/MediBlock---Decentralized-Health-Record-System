import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Signup.css'
import Web3 from "web3";
import contract from '../contracts/contract.json';
import { create } from 'ipfs-http-client'

import logosvg from "../data/mediblock.jpeg";

const Signup = () => {
    const [type, setType] = useState(false);
    const [regp, setRegp] = useState({
        "name": "",
        "mail": "",
        "password": "",
        "insurance": [{}],
        "allergies": [{}],
        "medicalhistory": [{}],
        "hospitalizationhistory": [{}],
        "visit": [{}],
        "selectedDoctors": [{}]
    });

    const [regd, setRegd] = useState({
        "name": "",
        "mail": "",
        "password": "",
        license: "",
        speciality: ""
    });

    function handle(e) {
        const newData1 = { ...regp };
        const newData2 = { ...regd };
        newData1[e.target.name] = e.target.value;
        newData2[e.target.name] = e.target.value;
        setRegp(newData1);
        setRegd(newData2);
    }

    function handleD(e) {
        const newData = { ...regd };
        newData[e.target.name] = e.target.value;
        setRegd(newData);
    }

    async function register(e) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const currentaddress = accounts[0];

        const web3 = new Web3(window.ethereum);
        const mycontract = new web3.eth.Contract(
            contract["abi"],
            contract["address"]
        );

        if (!e) {
            // patient
            let client = create();
            client = create(new URL('http://127.0.0.1:5001'));
            const { cid } = await client.add(JSON.stringify(regp));
            const hash = cid['_baseCache'].get('z');
            console.log(hash);

            await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
                alert("Account created");
                window.location.href = "/login";
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            // doctor
            let client = create();
            client = create(new URL('http://127.0.0.1:5001'))
            const { cid } = await client.add(JSON.stringify(regd));
            const hash = cid['_baseCache'].get('z');
            console.log(hash);

            await mycontract.methods.addDoctor(hash).send({ from: currentaddress }).then(() => {
                alert("Account created");
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (

        <div className="login-container bg-gradient-to-r from-cyan-500 to-blue-500 via-teal-200 ">
            <form className="login-form backdrop-blur-lg
               [ p-8 md:p-10 lg:p-10 ]
               [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl ]">
                <h2 className="login-form-title">Sign Up</h2>
                <div className="input-container">
                    <div className="input-div">
                        <div className="input-heading">
                            <i className="fas fa-user"></i>
                            <h5>Username</h5>
                        </div>
                        <input name="name" onChange={(e) => handle(e)} id="name" placeholder="Full Name" />
                    </div>
                    <div className="input-div">
                        <div className="input-heading" style={{ margin: "1rem 0", }}>
                            <i className="fas fa-key"></i>
                            <h5>User Type</h5>
                            <select id="user-type" name="type" onChange={() => { setType(!type) }} style={{ borderRadius: '5px', border: '1px solid #00d',padding:'0.5rem', backgroundColor: '#7aa74a', color: '#fafafa' }}>
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-div">
                        <div className="input-heading">
                            <i className="fas fa-envelope"></i>
                            <h5>Email</h5>
                        </div>
                        <input onChange={(e) => handle(e)} type="mail" placeholder="youremail@gmail.com" id="email" name="mail" />


                    </div>

                    {type &&
                        <div className="input-div" style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="input-heading">
                                    <i className="fas fa-suitcase"></i>
                                    <p>Specialization</p>
                                </div>
                                <input onChange={(e) => handleD(e)} type="text" placeholder="Specialization" id="email" name="speciality" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="input-heading">
                                    <i className="fas fa-key"></i>
                                    <p>License No.</p>
                                </div>
                                <input onChange={(e) => handleD(e)} type="text" placeholder="License No." id="email" name="license" />
                            </div>
                        </div>
                    }

                    <div className="input-div">
                        <div className="input-heading">
                            <i className="fas fa-lock"></i>
                            <h5>Password</h5>
                        </div>
                        <input onChange={(e) => handle(e)} type="password" placeholder="********" id="password" name="password" />

                    </div>

                </div>

                <input type="button" value="Sign Up" className="btn" onClick={() => { register(type) }} />
                <p style={{ textAlign: "right" }}>Already a user?
                    <Link style={{ marginLeft: "4px", color: "black", textDecoration: "underline" }} to='/login'>Log In.</Link>
                </p>

            </form >
            <div className=" signup login-element">
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
            Join Our <br/> Community
          </h4>
          <div className="body1" fontWeight="" color="whitesmoke">
            Be a part of Blockchain Network in Electronic Health Record System!
          </div>
      </div>
    </div>

      </div>
        </div >

    )
}

export default Signup;