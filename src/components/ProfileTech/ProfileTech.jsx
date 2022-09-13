import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips(props) {
  const classes = useStyles();

  useEffect(() => {}, [useState]);

  const [chipData, setChipData] = useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = (data) => {
    props.setTech(data);
  };

  return (
    <div component="div" className={classes.root}>
      {chipData.map((data) => {
        return (
          <div key={data.key}>
            <Chip
              label={data.label}
              value={data.label}
              onClick={() => handleClick(data.label)}
              className={classes.chip}
            />
          </div>
        );
      })}
    </div>
  );
}
