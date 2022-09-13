import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import ProfileForm from "../ProfileForm/ProfileForm";
import "./UserPage.css";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="userPageContainer">
      <div className="hero">
        <h2>Welcome, {user.username}!</h2>
        <h4>
          Let's fill out your profile information so you can start connecting
          with other developers!
        </h4>
      </div>
      <ProfileForm />
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
