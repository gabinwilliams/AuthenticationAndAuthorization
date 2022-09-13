import React from "react";
import "./ProfileEditHeader.css";
import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";

import ForumIcon from "@material-ui/icons/Forum";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const ProfileEditHome = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/mainView");
  };

  return (
    <div className="connectionHeader">
      <IconButton onClick={handleClick}>
        <ArrowBackIosIcon className="backIcon" fontSize="large" />
      </IconButton>

      <h2>Front to Back</h2>
      <LogOutButton />

      {/* <IconButton>
        <ForumIcon className="headerIcon" fontSize="large" />
      </IconButton> */}
    </div>
  );
};

export default ProfileEditHome;
