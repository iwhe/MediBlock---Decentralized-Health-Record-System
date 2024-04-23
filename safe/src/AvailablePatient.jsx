import React, { useState, Fragment, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Web3 from "web3";
import Navbar from "./components/Navbar";
import contract from "./contracts/contract.json";
import { useCookies } from "react-cookie";
import { create } from 'ipfs-http-client'
import Sidebar2 from "./components/Sidebar2";

const AvailablePatients = () => {
    const [cookies, setCookie] = useCookies();
    const [patients, setpatient] = useState([]);
    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
        contract["abi"],
        contract["address"]
    );

    function isDataUnique(array, newData) {
        // Assuming newData has a property 'hash' that makes it unique
        return !array.some(item => item.hash === newData.hash);
    }

    useEffect(() => {
        const pat= [];
        async function getPatients() {
            await mycontract.methods
                .getPatient()
                .call()
                .then(async (res) => {
                    for (let i = 0; i < res.length; i++) {
                        const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json()
                        data['hash'] = res[i];
                        pat.push(data);
                        
                    }
                })
            setpatient(pat);
            console.log(patients);
        }
        getPatients();
        return;
    }, [patients.length]);


  
    function showPatients() {
        return patients.map(data => {
            return (
                <tr>
                    <td>{data.name}</td>
                    <td>{data.mail}</td>
                    {/* <td>{data.speciality}</td> */}
                    <td><input type="button" value="Add"  /></td>
                    {/* onClick={() => add(data.hash)} */}
                </tr>
            )
        })
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
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                    <Navbar />
                </div>
                <div
                    style={{ display: "flex", flexDirection: "column", padding: "1rem" }}
                >
                    <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
                        <table style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className="">Name</th>
                                    <th className="">Email</th>
                                    {/* <th className="">Speciality</th> */}
                                    <th className="">Add Patient to your list</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showPatients()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AvailablePatients;
