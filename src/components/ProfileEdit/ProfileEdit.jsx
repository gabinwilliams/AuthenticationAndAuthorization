import ProfileEditHeader from "../ProfileEditHeader/ProfileEditHeader";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileEditImage from "../ProfileEditImage/ProfileEditImage";
import ProfileTech from "../ProfileTech/ProfileTech";
import LogoutHover from "../LogoutHover/LogoutHover";
import swal from "sweetalert";

import ProfileEditHomeBarApp from "../ProfileEditHomeBarApp/ProfileEditHomeBarApp";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ProfileTechChip from "../ProfileTechChip/ProfileTechChip";
import "./ProfileEdit.css";
import { AirlineSeatLegroomReducedTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    position: "absolute",
    top: 30,
    right: 35,
  },
}));

export default function ProfileForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [image, setImage] = React.useState("");
  const [name, setName] = useState("");
  const [dev, setDev] = useState("");
  const [github, setGithub] = useState("");
  const [bio, setBio] = useState("");
  const [tech, setTech] = React.useState([]);

  const handleChangeDev = (event) => {
    setDev(event.target.value);
  };

  const handleChangeGithub = (event) => {
    setGithub(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeBio = (event) => {
    setBio(event.target.value);
  };

  const registerUserInfo = async (event) => {
    event.preventDefault();

    console.log("This is user before changes:", user);
    let newTechOne = tech[0];
    let newTechTwo = tech[1];
    let newTechThree = tech[2];
    let newName = name;
    let newDev = dev;
    let newImage = image;
    let newBio = bio;
    let newGithub = github;

    if (name == "") {
      newName = user.name;
    }
    if (dev == "") {
      newDev = user.dev_type;
    }
    if (image == "") {
      newImage = user.profile_image;
    }
    if (bio == "") {
      newBio = user.bio;
    }
    if (github == "") {
      newGithub = user.github;
    }

    if (tech.length === 0) {
      console.log("In person Name if");
      newTechOne = user.tech_one;
      newTechTwo = user.tech_two;
      newTechThree = user.tech_three;
    }

    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        id: user.id,
        username: user.username,
        name: newName,
        dev_type: newDev,
        tech_one: newTechOne,
        tech_two: newTechTwo,
        tech_three: newTechThree,
        profile_image: newImage,
        bio: newBio,
        github: newGithub,
        active: true,
      },
    });

    swal("Updated!", "", "success");
  };

  return (
    <div>
      <ProfileEditHomeBarApp />
      <form className={classes.root} noValidate autoComplete="off">
        <div className="formContainer">
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={registerUserInfo}
          >
            Save
          </Button>

          <ProfileEditImage image={image} setImage={setImage} />

          <TextField
            id="outlined-search"
            type="search"
            onChange={handleChangeName}
            label="Name"
            helperText="Name shown on profile"
            defaultValue={user.name}
            variant="outlined"
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              {user.dev_type}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={dev}
              onChange={handleChangeDev}
              label={user.dev_type}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Frontend"}>Frontend</MenuItem>
              <MenuItem value={"Backend"}>Backend</MenuItem>
              <MenuItem value={"Fullstack"}>Fullstack</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-search"
            type="search"
            onChange={handleChangeGithub}
            label="Github"
            helperText="Visible to connections only"
            defaultValue={user.github}
            variant="outlined"
          />

          <TextField
            id="outlined-multiline-static"
            onChange={handleChangeBio}
            label="Bio"
            multiline
            rows={4}
            defaultValue={user.bio}
            variant="outlined"
          />
          <ProfileTechChip tech={tech} setTech={setTech} />
        </div>
      </form>
    </div>
  );
}
