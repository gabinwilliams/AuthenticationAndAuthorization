import React from 'react';
import { useDispatch } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    // <button
    //   // This button shows up in multiple locations and is styled differently
    //   // because it's styled differently depending on where it is used, the className
    //   // is passed to it from it's parents through React props
    //   className={props.className}
    //   onClick={() => dispatch({ type: 'LOGOUT' })}
    // >
    //   Log Out
    // </button>

    <IconButton color="inherit" onClick={() => dispatch({ type: 'LOGOUT' })}>
      <ExitToAppIcon></ExitToAppIcon>
    </IconButton>
  );
}

export default LogOutButton;
