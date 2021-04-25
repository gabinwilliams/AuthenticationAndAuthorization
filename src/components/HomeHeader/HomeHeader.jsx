import React from "react";
import { useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import "./HomeHeader.css";
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import IconButton from "@material-ui/core/IconButton";

const HomeHeader = () => {
  const history = useHistory();

  const handleClick = () => {

    history.push('/profileEdit');
  }

  return (
    <div className="header">
      <IconButton onClick={handleClick}>
        <PersonIcon className="headerIcon" fontSize="large" />
      </IconButton>

      <h2>Front to Back</h2>

      {/* <LogOutButton /> */}

      <IconButton>
        <ForumIcon className="headerIcon" fontSize="large" />
      </IconButton>
    </div>
  );
};

export default HomeHeader;
