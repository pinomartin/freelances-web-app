import React from "react";
import MainLogo from "../assets/mainLogoTransparent.svg";

const Home = () => {
  return (
    <>
    <div className="mt-5 text-center">
      <img src={MainLogo} alt="" className="img-fluid"/>
      <hr />
      <h3 className="text-white">
        {"Bienvenido a una nueva forma de trabajo Freelance"}
      </h3>
    </div>
    </>
  );
};

export default Home;
