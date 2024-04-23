import React from "react";
import PatNavbar from "../components/PatientNav";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import contract from "../contracts/contract.json";
import ECG from "../data/ecg247.png";

const HeartData = () => {
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
          className="container"
          style={{
            background:
              "linear-gradient(135deg, rgba(184, 110, 153, 0.21) 0%, rgb(152, 200, 239) 45%, rgba(0, 255, 76, 0.43) 100%)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            boxShadow:
              " inset rgb(184 110 153 / 21%) -1px -2px 20px 0px, rgb(152 200 239) 14px 20px 20px 0px inset, rgb(0 255 76 / 43%) -20px -19px 30px inset",
            borderRadius: "4rem",
            border: "0.23px solid rgb(96, 93, 255)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2.5rem",
            alignItems: "center",
            padding: "2.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.49rem", textTransform: "capitalize" }}>
            Track your heart data remotely using ECG247 Heart Sensor{" "}
          </h2>
          <div className="content" style= {{width:"100%", display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
            <div
              className="heartdata"
              style={{
                width:'100%',
                display: "flex",
                flexDirection:"column",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "4rem",
              }}
            >
              <div
                className="data"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div
                  className="first datacontainer flex items-center"
                  style={{ flexDirection: "column" }}
                >
                  <h2>Heart Rate :</h2>
                  <div
                    className="circle"
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "75px",
                      border: "5px solid red",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h2>170</h2>
                    <h2>BPM</h2>
                  </div>
                </div>
                <div
                  className="first datacontainer flex items-center"
                  style={{ flexDirection: "column" }}
                >
                  <h2>Blood Oxygen Level (SpO2):</h2>
                  <div
                    className="circle"
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "75px",
                      border: "5px solid red",
                      display: "flex",
                      //   flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h2>95</h2>
                    <h2>%</h2>
                  </div>
                </div>
              </div>
              <div
                className="data"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginLeft: "-60px",
                }}
              >
                <div
                  className="first datacontainer flex items-center"
                  style={{ flexDirection: "column" }}
                >
                  <h2>Heart Rate Variability (HRV):</h2>
                  <div
                    className="circle"
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "75px",
                      border: "5px solid red",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h2>25</h2>
                    <h2>ms</h2>
                  </div>
                </div>
                <div
                  className="first datacontainer flex items-center"
                  style={{ flexDirection: "column" }}
                >
                  <h2>Blood Cholestrol Level :</h2>
                  <div
                    className="circle"
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "75px",
                      border: "5px solid red",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h2>120</h2>
                    <h2>mg/dL</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="ecg247img" style={{opacity:"100%", mixBlendMode:'multiply'}}>
              <img src={ECG} alt="ECG" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export HeartData;

export default HeartData;
