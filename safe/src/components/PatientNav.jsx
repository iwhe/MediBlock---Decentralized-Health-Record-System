import React, { useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useCookies } from "react-cookie";
import avatar from "../data/avatar.png";
// import { Sidebar } from "./Sidebar";
import { NavLink } from "react-router-dom";
import { UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { FaUserDoctor } from "react-icons/fa6";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const PatNavbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const Doctors = "/doctors";

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  const [cookies, setCookie] = useCookies();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = "flex items-center rounded-lg text-md text-white m-2";
  const normalLink =
    "flex items-center gap-5 p-2 rounded-lg text-md text-white";

  // dark:hover:text-black hover:bg-light-gray m-2

  return (
    <div
      className="flex justify-end p-6 md:ml-6 md:mr-6 relative"
      style={{ width: "100%" }}
    >
      <div
        className="flex"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        {/* inset 0 2px 1px rgba(0, 0, 0, 0.5) */}
        <div
          className="doctors flex items-center cursor-pointer rounded-lg"
          style={{  boxShadow:
            " inset rgb(184 110 153 / 21%) -1px -2px 20px 0px, rgb(152 200 239) 14px 20px 20px 0px inset, rgb(0 255 76 / 43%) -20px -19px 30px inset",
            borderRadius: "4px",
            border: "0.23px solid #605dff",
          }}
        >
          <NavLink
            onClick={handleCloseSideBar}
            style={({ isActive }) => ({
              background: isActive ? currentColor : "",
              // linear-gradient(90deg,#5da8ff,#605dff 50%,#ad63f6)

              // boxShadow:'0 25px 50px -12px #000000b3'
            })}
            to={Doctors}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <button 
              style={{
                background: "-webkit-linear-gradient(left, red, blue)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textTransform:'uppercase',
                fontWeight:"600",
                letterSpacing:".7px",
                fontSize: "1.0rem",
                display: 'flex',
                gap: '0.5rem',
                padding:'4px',
                alignItems: "center",
              }}
            >
              <FaUserDoctor color="black"/>
              See Available Doctors
            </button>
          </NavLink>
        </div>

        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">LOG OUT</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {cookies["name"]}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {/* {isClicked.doctors && (<Doctors />)} */}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default PatNavbar;
