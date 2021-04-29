import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    bottom: 0,
    background: 'rgba(220, 220, 220, .8)',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderRadius: 5,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '75vw',
  },
  chatField: {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}));

export default function LayoutTextFields(props) {
  const classes = useStyles();

  const chatPerson = useSelector((store) => store.chat);


  const handleChat = (event) => {
    props.setChat(event.target.value);

    
  }

  const handleSend = () => {
    console.log('This is the chatPerson:', chatPerson);
  }


  return (
    <div className={classes.root}>
      
       
      <div className={classes.chatField}>

      
      
        <TextField
            label="Chat"
            id="outlined-margin-normal"
            // defaultValue="Default Value"
            className={classes.textField}
            // helperText="Some important text"
            margin="normal"
            variant="outlined"
            onChange={handleChat}
          />
          <IconButton onClick={handleSend}>
            <SendIcon color='primary' fontSize="large"></SendIcon>
          </IconButton>
        </div>
      
    </div>
  );
}