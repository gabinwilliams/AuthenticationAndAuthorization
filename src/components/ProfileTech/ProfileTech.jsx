
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips(props) {
  const classes = useStyles();
 


  const [chipData, setChipData] = useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = (data) => {
    // event.preventDefault()
    console.info('You clicked the Chip:', data);
    if(props.tech.length < 3) {
      props.setTech([...props.tech, data])
    }
    console.log('this is tech array:', props.tech);
  };

  return (

    <div component="div" className={classes.root}>
    {chipData.map((data) => {
      // let icon;

      // if (data.label === 'React') {
      //   icon = <TagFacesIcon />;
      // }

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

     {/* <Chip
        icon={<FaceIcon />}
        label="Clickable deletable"
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      /> */}
  </div>

     
     
    
  );
}