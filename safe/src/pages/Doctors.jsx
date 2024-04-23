import React, { useState, Fragment, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import contract from "../contracts/contract.json";
import { useCookies } from "react-cookie";
import { create } from 'ipfs-http-client'

const Doctors = () => {
    const [cookies, setCookie] = useCookies();
    const [doctors, setDoc] = useState([]);
    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
        contract["abi"],
        contract["address"]
    );

    useEffect(() => {
        const doc = [];
        async function getDoctors() {
            await mycontract.methods
                .getDoctor()
                .call()
                .then(async (res) => {
                    for (let i = 0; i < res.length; i++) {
                        const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json()
                        data['hash'] = res[i];
                        doc.push(data);
                    }
                })
            setDoc(doc);
            console.log(doctors);
        }
        getDoctors();
        return;
    }, [doctors.length]);


    async function add(hash) {
        var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        var currentaddress = accounts[0];

        const web3 = new Web3(window.ethereum);
        const mycontract = new web3.eth.Contract(contract['abi'], contract['address']);

        mycontract.methods.getPatient().call()
            .then(async (res) => {
                for (let i = res.length - 1; i >= 0; i--) {
                    if (res[i] === cookies['hash']) {
                        const pat = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json();
                        const drs = pat.selectedDoctors;

                        let flag = 0;
                        for (let j = 0; j < drs.length; j++) {
                            if (drs[j] === hash) {
                                flag = 1;
                                break;
                            }
                        }

                        if (!drs.includes(hash)) {
                            drs.push(hash);
                            pat.selectedDoctors = drs;

                            let client = create();
                            client = create(new URL('http://127.0.0.1:5001'))
                            const { cid } = await client.add(JSON.stringify(pat));
                            const nhash = cid['_baseCache'].get('z');

                            mycontract.methods.addPatient(nhash).send({ from: currentaddress }).then(() => {
                                setCookie('hash', nhash);
                                alert("Doctor added Successfully!");
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                        else {
                            alert("Doctor already added");
                        }
                        break;
                    }
                }
            })
    }

    function showDoctors() {
        return doctors.map(data => {
            return (
                <tr>
                    <td style={{fontWeight:"bold"}}>{data.name}</td>
                    <td>{data.mail}</td>
                    <td style={{fontWeight:"bold"}}>{data.speciality}</td>
                    <td><input type="button" style={{textDecoration:"underline"}} value="Add" onClick={() => add(data.hash)} /></td>
                </tr>
            )
        })
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
                    <Navbar />
                </div>
                <div
                    style={{ display: "flex", flexDirection: "column", padding: "1rem" }}
                >
                    <div className=" [ bg-gradient-to-b from-white/60 to-white/30 ]"
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
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
            }}
            style={{
              width: "100%",
              borderRadius: "20px 20px 0px 0px",
              gap: "1rem",
              backgroundColor: "#7ED957",
            }}
          >
            <h1
              style={{
                padding: "10px",
                textTransform: "uppercase",
                fontSize: "1.5rem",
              }}
              className="text-center text-lg"
            >
Available doctors
            </h1>

            <table className=" [ bg-gradient-to-b from-white/60 to-white/30 ]
                "
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
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
            }}
            style={{
              width: "100%",
              borderRadius: "20px 20px 0px 0px",
              gap: "1rem",
              color:  "#4a4a4a",
              backgroundColor: "#7ED957",
              borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className="">Name</th>
                                    <th className="">Email</th>
                                    <th className="">Speciality</th>
                                    <th className="">Book Doctor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showDoctors()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Doctors;
