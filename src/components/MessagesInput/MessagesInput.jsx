import React, {useState, useEffect} from 'react';
import axios from 'axios';
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

  const dispatch = useDispatch();

  const currentChat = useSelector((store) => store.currentChat);
  const user = useSelector((store) => store.user);
  const allMessages = useSelector((store) => store.messages);

  useEffect(() => {
    dispatch({ type: "FETCH_MESSAGES" });
    dispatch({ type: 'FETCH_CURRENT_CHAT'});


  }, [dispatch] );

  const filterMessages = () => {
    console.log('Original messages:', allMessages);

    // let filteredArray = allMessages.filter(data => data.user_id === user.id && data.liked_user_id === );
  }

  const handleChat = (event) => {
    props.setChat(event.target.value);

    
  }

  const handleSend = () => {
    console.log('This is the chatPerson:', currentChat);

    let obj = {
      user_id: user.id,
      liked_user_id: currentChat[0].liked_user_id,
      name: currentChat[0].name,
      profile_image: currentChat[0].profile_image,
      match: currentChat[0].match,
      message: props.chat,
    }

    
    console.log('This is obj to send:', obj);
    axios
      .post("/api/user/chat", obj)
      .then((response) => {
        
        props.setChat('');
      })
      .catch((err) => {
        console.log("Error in POST /chat", err);
      });

      // axios
      // .post("/api/user/current/chat", obj)
      // .then((response) => {
      //   props.setChat('');
      //   // dispatch({ type: "FETCH_MESSAGES" });
      //   // dispatch({ type: 'FETCH_CURRENT_CHAT'});
      // })
      // .catch((err) => {
      //   console.log("Error in POST /current/chat", err);
      // });
        
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
            value={props.chat}
            margin="normal"
            variant="outlined"
            onChange={handleChat}
          />
          <IconButton onClick={() => handleSend()}>
            <SendIcon color='primary' fontSize="large"></SendIcon>
          </IconButton>
        </div>
      
    </div>
  );
}