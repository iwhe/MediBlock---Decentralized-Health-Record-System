import React from "react";

import "./Home.css";
import { Link, NavLink } from "react-router-dom";
import { GiStethoscope } from "react-icons/gi";

import logo from "../data/logo.png";
import logosvg from "../data/mediblock-logo-1.svg";
import sthetoscope from "../data/stethoscope-.svg";
import down from "../data/upload.svg";
import user from "../data/user.svg";
import tick from "../data/tick.svg";
import store from "../data/store.png";
import doc from "../data/doc.svg";
import disease from "../data/ecg247.png";
import  { useState, useEffect, useRef } from "react";
// import{ useState } from "react";
import EmailUs from  "../components/EmailUs"
const Home = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };
 

  return (
    <div>
      <header className="header" id="header">
        <nav className="nav mx-4">
          <div className="logo">
            <a href="#">
              <img className="logo-img" src={logosvg} />
            </a>
            <a href="#" className="nav__logo">
              MediBlock
            </a>
          </div>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li  className="nav__item">
                <a
                  href="#home"
                  className={`nav__link ${
                    activeLink === "home" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("home")}
                >
                  Home
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#services"
                  className={`nav__link ${
                    activeLink === "services" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("services")}
                >
                  Services
                </a>
              </li>
              <li  className="nav__item">
                  <a
                  href="#about"
                  className={`nav__link ${
                    activeLink === "about" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("about")}
                >
                  Get Started
                </a>
              </li>
              {/* <li className="nav__item">
                <a href="#how" className="nav__link">
                  How?
                </a>
              </li> */}
             
              <li className="nav__item">
                <a
                  href="#contact"
                  className={`nav__link ${
                    activeLink === "contact" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("contact")}
                >
                  Contact Us
                </a>
              </li>

              <i
                className="bx bx-toggle-left change-theme"
                id="theme-button"
              ></i>
            </ul>
          </div>

          <div className="nav__toggle" id="nav-toggle">
            <i className="bx bx-grid-alt"></i>
          </div>
          <div style={{ display: "flex" }}>
            <Link to="/login" className="button button__header log">
              Log In
            </Link>
            <Link to="/signup" className="button button__header">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <main style={{ overflowY: 'auto', marginTop: 0 }} className="main">
        <section className="home section " id="home">
          <div className="home__container  grid">
            <div className="home__data">
            <div className="introduction">
              <h1 className="home__title">Health Record System</h1>
              <p className="home__description">
                MediBlock is a secure blockchain based platform for storage of
                highly sensitive and critical data related to patients that is
                shared among multiple facilities and agencies for effective
                diagnosis and treatment.
              </p>
              </div>
              
            <img className="sto-img" src={sthetoscope} />
            </div>
              <Link to="/signup" className="button">
                Sign Up Now!
              </Link>
            </div>
            
          
        </section>
        <div className="services_about">
        <section className="services section container" id="services">
          <h2 className="section__title">Services we deliver</h2>
          <div className="services__container grid">
            <div className="services__data">
              <h3 className="services__subtitle">
                Maintaining Medical Records
              </h3>
              <img className="services__img" src={store} />
              <p className="services__description">
                Keep track of your medical records, enabled by blockchain
                technology.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Connect With Doctors</h3>
              <img className="services_img" src={doc} />
              <p className="services__description">
                Share your records with our trusted medical experts, to get a
                prescription.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">ECG247 Heart Sensor Data</h3>
              <img className="servicesimg" src={disease} />
              <p className="services__description">
                Getting your heart related information made easier and flexible
                by allowing you track data remotely.
              </p>
            </div>
          </div>
        </section>
        <section className="services section container" id="about">
          <h2 className="section__title">Getting started is quick and easy</h2>
          <div className="services__container grid">
            <div className="services__data">
              <h3 className="services__subtitle">Register Yourself</h3>
              <img className="services__img" src={user} />
              <p className="services__description">
                Register yourself to the locker, secured by blockchain
                technology.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Authenticate Yourself</h3>
              <img className="services__img" src={tick} />
              <p className="services__description">
                Log In with your credentials.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Upload your Data</h3>
              <img className="services__img" src={down} />
              <p className="services__description">
                Create, update, or view your health record information.
              </p>
            </div>
          </div>
        </section>
        </div>

        <section className="contact section container " id="contact">
        <h2 className="section__title">Contact Us</h2>
          <div className="contact__container">
          <div className="contact__content">
            <p className="contact__description">
                You can contact us from here, you can write to us for
                suggestions and enhancements.
              </p>
              <li className="contact__address">
                <h2>Team Members:</h2> <br></br>
                <span className="team_members">
                  <li>
                    <span style={{ fontWeight: "600" }}>Bhupesh Paneru </span>
                    <br></br>
                    <span className="email">1by20cs040@bmsit.in</span>
                  </li>
                  <li>
                    <span style={{ fontWeight: "600" }}>Benton Biju </span>
                    <br></br>
                    <span className="email">1by20cs037@bmsit.in</span>
                  </li>
                  <li>
                    <span style={{ fontWeight: "600" }}>Sai Lohitha </span>
                    <br></br>
                    <span className="email">1by20cs056@bmsit.in</span>
                  </li>
                  <li>
                    <span style={{ fontWeight: "600" }}>Cheerla Navitha </span>
                    <br></br>
                    <span className="email">1by20cs044@bmsit.in</span>
                  </li>
                  {/* <li>Benton Biju</li>
                    <li>Cheerla Navitha</li> 
                    <li>Sai Lohitha</li> */}
                </span>
              </li>
            </div>
            <div className="contact__content">
              <div className="Emailus">
              <EmailUs/>
              </div>
            </div>

          
            <div className="location w-full" >
            <div className="contact__address">
                <h2> Location:</h2> 
                <span className="contact__information">
                  BMS Institute of Technology & Management <br></br>{" "}
                  <span className="collegeName">
                    Yelahanka, Bangalore, Karnataka, IN{" "}
                  </span>
                </span>
              </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.446801775793!2d77.56681777482186!3d13.134192811293252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae18a5c54ece35%3A0x49c4c47a68a60b9c!2sBMS%20Institute%20of%20Technology%20and%20Management!5e0!3m2!1sen!2sin!4v1713096050208!5m2!1sen!2sin"
              width="350"
              height="350"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer section">
        <p className="footer__copy">
          Design And Developed By The Student of BMSIT&M
        </p>
        <p className="footer__copy">
          &#169; MediBlock. All rights reserved 2024 &#169;
        </p>
      </footer>
    </div>
  );
};

export default Home;
