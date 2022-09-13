import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";
import ProfileTech from "../ProfileTech/ProfileTech";
import ProfileTechChip from "../ProfileTechChip/ProfileTechChip";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import swal from "sweetalert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./ProfileForm.css";

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
}));

export default function ProfileForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);

  const [tech, setTech] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [dev, setDev] = useState("");
  const [github, setGithub] = useState("");
  const [bio, setBio] = useState("");

  const [chipData, setChipData] = useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

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

  const registerUserInfo = (event) => {
    event.preventDefault();

    if (name === "" || image === "") {
      swal(
        "Oops!",
        "Please fill out your name, add a photo and top 3 tech.",
        "warning"
      );
      return;
    } else {
      dispatch({
        type: "UPDATE_PROFILE",
        payload: {
          id: user.id,
          username: user.username,
          name: name,
          dev_type: dev,
          tech_one: tech[0],
          tech_two: tech[1],
          tech_three: tech[2],
          profile_image: image,
          bio: bio,
          github: github,
          active: true,
        },
      });

      history.push("/mainView");
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="ProfileFormContainer">
        <ProfileImage image={image} setImage={setImage} />

        <TextField
          required
          id="outlined-required"
          onChange={handleChangeName}
          label="Name"
          helperText="Name shown on profile"
          defaultValue=""
          variant="outlined"
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Dev</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={dev}
            onChange={handleChangeDev}
            label="Dev"
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
          required
          id="outlined-required"
          onChange={handleChangeGithub}
          label="Github"
          helperText="Visible to connections only"
          defaultValue=""
          variant="outlined"
        />

        <TextField
          id="outlined-multiline-static"
          onChange={handleChangeBio}
          label="Bio"
          multiline
          rows={4}
          defaultValue=""
          variant="outlined"
        />
        <ProfileTechChip tech={tech} setTech={setTech} />
        <button className="submitBtn" onClick={registerUserInfo}>
          submit
        </button>
      </div>
    </form>
  );
}
