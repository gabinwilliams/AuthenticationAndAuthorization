import React from "react";
import "./MessagesHeader.css";
import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";

import ForumIcon from "@material-ui/icons/Forum";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const ProfileEditHome = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/connection");
  };

  return (
    <div className="messagesHeader">
      <IconButton onClick={handleClick}>
        <ArrowBackIosIcon className="backIcon" fontSize="large" />
      </IconButton>

      <h2>Front to Back</h2>
      <LogOutButton />
    </div>
  );
};

export default ProfileEditHome;
