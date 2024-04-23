import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaAllergies, FaBookMedical } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import {
  MdOutlineMeetingRoom,
  MdOutlineMedicalServices,
  MdMedicalServices,
} from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";
import { GiArtificialHive } from "react-icons/gi";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "my profile",
        icon: <CgProfile />,
      },
    ],
  },
  // {
  //   title: "Available Doctors",
  //   links: [
  //     {
  //       name: "doctors",
  //       icon: <MdOutlineMedicalServices />,
  //     },
  //   ],
  // },
  {
    title: "Health Records",
    links: [
      {
        name: "medical history",
        icon: <FaBookMedical />,
      },
      {
        name: "allergies",
        icon: <FaAllergies />,
      },
      {
        name: "insurance",
        icon: <IoDocumentOutline />,
      },
      // {
      //   name: "checkup history",
      //   icon: <MdOutlineMeetingRoom />,
      // },
      // {
      //   name: "hospitalization history",
      //   icon: <MdMedicalServices />,
      // },
    ],
  },

  {
    title: "Remote Data Monitoring",
    links: [
      {
        name: "ECG247 Heart Sensor",
        icon: <TbActivityHeartbeat />,
      },
    ],
  },
  {
    title: "ML model Prediction",
    links: [
      {
        name: "predict disease",
        icon: <GiArtificialHive />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
];
