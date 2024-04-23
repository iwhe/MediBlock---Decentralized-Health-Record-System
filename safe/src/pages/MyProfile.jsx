import React from "react";
import { useState, useEffect } from "react";
import PatNavbar from "../components/PatientNav";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useCookies } from "react-cookie";
import Web3 from "web3";
import contract from "../contracts/contract.json";

import avatar from "../data/avatar.png";

const MyProfile = () => {
  const web3 = new Web3(window.ethereum);
  const mycontract = new web3.eth.Contract(
    contract["abi"],
    contract["address"]
  );
  const [cookies, setCookie] = useCookies();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    const hash = cookies["hash"];
    fetch(`http://localhost:8080/ipfs/${hash}`)
      .then((res) => res.json())
      .then((res) => {
        setName(res.name);
        setEmail(res.mail);
        setPassword(res.password);
      });
  });

  const [auth, setAuth] = useState({
    type: "user",
    name: name,
    mail: email,
    password: password,
  });

  const [disabled1, setDisabled1] = useState(true);

  function handleGameClick1() {
    setDisabled1(!disabled1);
  }
  const [disabled2, setDisabled2] = useState(true);

  function handleGameClick2() {
    setDisabled2(!disabled2);
  }
  const [disabled3, setDisabled3] = useState(true);

  function handleGameClick3() {
    setDisabled3(!disabled3);
  }

  async function save() {}

  async function show() {}

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
        <div className="flex justify-center m-10 ">
          <form
            className=" [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl ]"
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
              Patients Profile
            </h1>

            <div
              className="ProfileContainer flex row align-center"
              style={{ justifyContent: "space-between", padding: "1.5rem" }}
            >
              <div
                className="profilePicture col-xl-4 col-md-4"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "150px",
                  border: "1px solid #C471ED",
                  backgroundColor: "rgb(3, 201, 215)",
                  display: "inline-block",
                  marginRight: "1.5em",
                }}
              >
                <img src={avatar} alt="profile-picture" />
              </div>
              <div className="col-xl-6 col-md-6 block gap-y-8 profileDetails">
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
                      disabled={disabled1}
                      required
                    />
                  </label>
                  <input
                    type="button"
                    value="✎"
                    className="text-2xl hover:text-blue-400 cursor-pointer"
                    onClick={handleGameClick1}
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
                      disabled={disabled2}
                      required
                    />
                  </label>
                  <input
                    type="button"
                    value="✎"
                    className="text-2xl hover:text-blue-400 cursor-pointer"
                    onClick={handleGameClick2}
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
                      disabled={disabled3}
                      required
                    />
                  </label>
                  <input
                    type="button"
                    value="✎"
                    className="text-2xl hover:text-blue-400 cursor-pointer"
                    onClick={handleGameClick3}
                  ></input>
                </div>

                <div className="py-2">
                  <input
                    type="button"
                    value="Save"
                    onClick={save}
                    className="bg-cyan-400 text-white font-medium p-3"
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

export default MyProfile;
