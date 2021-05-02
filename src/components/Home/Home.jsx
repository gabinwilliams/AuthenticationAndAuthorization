import React, { useState } from "react";
import "./Home.css";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeAppBar from '../HomeAppBar/HomeAppBar';
import HomeCard from "../HomeCard/HomeCard";

const Home = () => {
  return (
    <>
      {/* <HomeHeader /> */}
      <HomeAppBar />
      <HomeCard />
      {/* Buttons below tinder card */}
    </>
  );
};

export default Home;
