import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  Toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickBack = () => {
    history.goBack();
  };

  const handleHome = () => {
    history.push("/mainView");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    history.push("/profileEdit");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.Toolbar}>
          <IconButton
            onClick={handleClickBack}
            color="inherit"
            aria-label="menu"
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleHome} color="inherit">
            <Typography variant="h6" className={classes.title}>
              <img
                src="https://raw.githubusercontent.com/gabinwilliams/soloProject/8adb4c43f2c3e5f4d56d4d4986816dee6279d829/public/Images/Component%201-5.svg"
                alt="Logo"
              />
            </Typography>
          </IconButton>
          <IconButton onClick={handleProfile} color="inherit" aria-label="menu">
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
