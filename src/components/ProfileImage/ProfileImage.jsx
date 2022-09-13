import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignitems: "baseline",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  img: {
    objectFit: "contain",
    margin: 5,
    width: 150,
    height: 150,
  },
}));

export default function ProfileImage(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setImage(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div>
        <Avatar className={classes.img} alt="profile Image" src={props.image} />
      </div>
      <div className={classes.img}>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
          onChange={handleChange}
          label="Profile Image"
          helperText="Enter URL"
          defaultValue=""
          variant="outlined"
        />
      </div>
    </div>
  );
}
