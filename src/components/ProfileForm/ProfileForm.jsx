import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImage from '../ProfileImage/ProfileImage';
import ProfileTech from '../ProfileTech/ProfileTech';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
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

  const user = useSelector((store) => store.user);

  const[tech, setTech] = useState([]);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [dev, setDev] = useState('');
  const [github, setGithub] = useState('');
  const [bio, setBio] = useState('');

  const [chipData, setChipData] = useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
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

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        id: user.id,
        username: user.username,
        name: name,
        dev_type: dev,
        profile_image: image,
        bio: bio,
        github: github,
      },
    });
  }; // end registerUser

  

  return (
    <form className={classes.root} noValidate autoComplete="off">
      
      <div>
        
        <ProfileImage image={image} setImage={setImage}/>
        
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
          <MenuItem value={'Frontend'}>Frontend</MenuItem>
          <MenuItem value={'Backend'}>Backend</MenuItem>
          <MenuItem value={'Fullstack'}>Fullstack</MenuItem>
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
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="outlined"
        />
        <ProfileTech tech={tech} setTech={setTech} />
      </div>
      <button onClick={registerUserInfo} >submit</button>
    </form>
  );
}