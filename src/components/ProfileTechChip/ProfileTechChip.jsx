import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import './ProfileTechChip.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Angular',
  'jQuery',
  'Polymer',
  'React',
  'Vue.js',
  'Next.js',
  'JavaScript',
  'Python',
  'TypeScript',
  'Ruby',
  'Node',
  'PostgreSQL',
  'MongoDB',
  'Redux',
  'Redux-Saga',
  
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState([]);
  const user = useSelector((store) => store.user);

  

  
  const handleChange = (event) => {
    console.log(props.personName);
    props.setTech(event.target.value);
  

  
    
  };

  
  
  return (
    <div>
      
     
      <FormControl className={classes.formControl}>
      
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={props.tech}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, props.tech, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <p className="techTitle">Current Top 3 Tech</p>
        <hr/>
      <div className="currentTech">
        <p className="techP">{user.tech_one}</p>
        <p className="techP">{user.tech_two}</p>
        <p className="techP">{user.tech_three}</p>
      </div>
      
    </div>
  );
}