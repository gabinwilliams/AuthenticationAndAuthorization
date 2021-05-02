import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import IconButton from "@material-ui/core/IconButton";
import ProfileEditHeader from '../ProfileEditHeader/ProfileEditHeader';
import HomeModal from '../HomeModal/HomeModal';
import MessagesAppBar from '../MessagesAppBar/MessagesAppBar';
import './ConnectionPage.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  chatBubble: {
    // paddingRight: 20,
    
  }
 
}));


const ConnectionPage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const fetchUserLikes = useSelector((store) => store.fetchUserLikes);
  const userProfiles = useSelector((store) => store.userProfiles);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
    dispatch({ type: 'FETCH_LIKES'});

  }, [dispatch] );

  
  

  const filterArray = () => {
    // let newNewArray = userProfiles.filter(data => data.id != user.id);
    let likedArray = fetchUserLikes.filter(data => data.liked_user_id == user.id && data.liked == true || data.liked_user_id == user.id && data.match == true);
    // let newArray = userProfiles.filter(data => data.id != user.id);

   
      
      
      console.log('filtered array for likes', likedArray);

      return likedArray;

    }
    let arrayToMap = filterArray();


    const updateMatch = (person) => {
        // console.log('Conditional render', match);
        console.log(person.user_id, person.liked_user_id);
        dispatch({
          type: 'UPDATE_MATCH',
          payload: {
            user_id: person.user_id,
            liked_user_id: person.liked_user_id,
            match: true,

          },
        });

    }

    const handleChat = (person) => {
      console.log('This is the id to send', person);

      let obj = {
        user_id: user.id,
        liked_user_id: person.user_id,
        name: person.name,
        profile_image: person.profile_image,
        match: person.match,

      }
      console.log('This is obj to send:', obj);

      axios
      .post("/api/user/current/chat", obj)
      .then((response) => {
        
        // dispatch({ type: "FETCH_MESSAGES" });
        dispatch({ type: 'FETCH_CURRENT_CHAT'});
      })
      .catch((err) => {
        console.log("Error in POST /current/chat", err);
      });

      dispatch({type: 'CHAT_ID', payload: obj});

      history.push('/messages');
    }

    const deleteConnection = (person) => {
      console.log('delete clicked', person);

      let obj = {
        user_id: person,
        
      }
      axios
    .delete(`/api/profile/connection/request/${person}`)
    .then((response) => {
      console.log('DELETE from connectionPage:', response);
      dispatch({type: 'FETCH_LIKES'})
    })
    .catch((err) => {
      console.log("Error in DELETE", err);
    });


      
    }



  return (

    <div>
      
      <MessagesAppBar />
    <div className="connectionPageContainer">
      {arrayToMap.map(person => (

        

      <div key={person.user_id}>
        
        <div className="connectionContainer">
        
          <div className="connectionTile">
            <div className="imageBtn">
              <HomeModal open={open} setOpen={setOpen} person={person}/>
              
              <div className="profileImageContainer"
                  style={{backgroundImage: `url(${person.profile_image})`}}>
              </div>
              <p className="profileName" >{person.name}</p>
            </div>
              
            <div>
              
              <div className="techContainer">
                <p className="tech">{person.tech_one}</p>
                <p className="tech">{person.tech_two}</p>
                <p className="tech">{person.tech_three}</p>
              </div>
            </div>
            </div>

          <div className="buttonsContainer">
          { //Check if message failed
        (person.match == false)
          ? <div className="buttonWrapper" >
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                onClick={() => updateMatch(person)}
              >
                Accept
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                onClick={() => deleteConnection(person.user_id)}
              >
                Decline
              </Button>
             
            </div>
          
          : <div > 
              <IconButton onClick={() => handleChat(person)}>
                <ChatBubbleIcon className={classes.chatBubble} fontSize="large"></ChatBubbleIcon>
              </IconButton>
              
            </div> 
      }
              
              
              
            
          </div>

        </div>
      </div>
    ))}
    </div>
    </div>
  )
}

export default ConnectionPage
