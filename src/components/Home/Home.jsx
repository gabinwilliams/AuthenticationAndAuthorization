import React, { useState } from "react";
import "./Home.css";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeCard from "../HomeCard/HomeCard";

const Home = () => {
  return (
    <div className="homeContainer">
      <HomeHeader />
      <HomeCard />
      {/* Buttons below tinder card */}
    </div>
  );
};

export default Home;
