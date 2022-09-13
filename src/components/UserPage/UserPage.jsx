import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import ProfileForm from "../ProfileForm/ProfileForm";
import "./UserPage.css";

function UserPage() {
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
    </div>
  );
}

export default UserPage;
