import React from "react";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <IconButton color="inherit" onClick={() => dispatch({ type: "LOGOUT" })}>
      <ExitToAppIcon></ExitToAppIcon>
    </IconButton>
  );
}

export default LogOutButton;
