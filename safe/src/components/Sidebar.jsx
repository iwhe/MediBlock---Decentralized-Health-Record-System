import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import logo from '../data/mediblock-logo-1-svg.svg';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div style={{ backgroundColor:"#fafefe" }} className=" sidebar h-screen pl-4 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div  className="flex justify-between items-center ">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-4 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <img style={{width:"60px"}} src={logo}/> <span>MediBlock</span>
            </Link>
            {/* <TooltipComponent content="Menu" position="BottomCenter"> */}
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            {/* </TooltipComponent> */}
          </div>
          <div style={{ backgroundColor: "#fff",paddingTop:"5px" }}>
            {links.map((item) => (
              <div key={item.title}>
                
                <p style={{ color: "black",fontWeight:"600"}}className="text-gray-400 dark:text-gray-400 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name.replace(/ /g,'')}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
