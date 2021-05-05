import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function RegisterForm() {

  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <div className="container" 
    style={{backgroundImage: `url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fHRlY2hub2xvZ3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60)`}}>
    
    <form className="formPanel" onSubmit={registerUser}>
      <div>
        <img src="https://raw.githubusercontent.com/gabinwilliams/soloProject/8adb4c43f2c3e5f4d56d4d4986816dee6279d829/public/Images/Component%201-5.svg" alt="Logo"/>
        <hr/>
      </div>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="username"
        value={username}
        required
        onChange={(event) => setUsername(event.target.value)}
        />


        <TextField id="standard-basic" label="password" 
        id="standard-password-input"
        type="password"
        value={password}
        required
        onChange={(event) => setPassword(event.target.value)}
        />
        
      </form>
        {/* <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label> */}
      </div>
      {/* <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div> */}
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
      <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
    </form>
    </div>
  );
}

export default RegisterForm;
