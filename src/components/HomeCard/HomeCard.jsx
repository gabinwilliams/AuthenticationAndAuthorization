import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeModal from '../HomeModal/HomeModal';
import TinderCard from 'react-tinder-card';
import axios from "axios";
import './HomeCard.css';



const HomeCard = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const userLikes = useSelector((store) => store.userLikes);
  const userProfiles = useSelector((store) => store.userProfiles);
  const [open, setOpen] = useState(false);
  
  
 

  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });

  }, [] );


  
  useEffect(() => {

  })


 

  const onSwipe = (id, direction) => { 
    console.log('You swiped: ', direction)
    console.log('You swiped:', id);

      if(direction === 'right') {
        direction = true;
        let obj = {
          user_id: user.id,
          liked: direction,
          liked_user_id: id
        }

        axios
      .post("/api/user/updateLikes", obj)
      .then((response) => {
        console.log('POST obj from Swipe:', response);
      })
      .catch((err) => {
        console.log("Error in POST", err);
      });
      // dispatch({type: "UPDATE_LIKES", payload: true})
    }
      if(direction === 'left') {
        direction = false;

        let obj = {
          user_id: user.id,
          liked: direction,
          liked_user_id: id
        }
        axios
      .post("/api/user/updateLikes", obj)
      .then((response) => {
        console.log('POST obj from Swipe:', response);
      })
      .catch((err) => {
        console.log("Error in POST", err);
      });

      if(direction == 'up') {
          console.log('Just swiped up!');
          setOpen(false);
          console.log('Should be true: ', open);
      }

        
      
      }
      
  }
  
  // const onCardLeftScreen = (myIdentifier) => {
  //   console.log(myIdentifier, ' left the screen')

  //   dispatch({type: "UPDATE_LIKED_ID", payload: myIdentifier})
    
    
  // }

  // const sendLikesObject = () => {
  //   console.log('Current user likes: ', userLikes);

  //   dispatch({type: "UPDATE_LIKED_OBJECT", payload: userLikes})
  // }
  
  
  const removeLoggedUserFromArray = () => {

    let newArray = userProfiles.filter(data => data.id != user.id);
    console.log('New state Array: ', newArray); 
    return newArray;
  }
  const profileArray = removeLoggedUserFromArray();

  
 
  


  
  return (
    
    <div>
      
      
    
      
       
      <div className="cardContainer">
      
        {profileArray.map(person => (

          <TinderCard 
            key={person.name}
            className="swipe"
            // onCardLeftScreen={() => onCardLeftScreen( person.id)}
            onSwipe={(direction) => onSwipe(person.id, direction)}
            
            // prop from tinder-card library to prevent swiping up or down
            preventSwipe={['up', 'down']}
          >
            
            <div 
            className="card"
              
            style={{backgroundImage: `url(${person.profile_image})`}}
            >
              <HomeModal open={open} setOpen={setOpen} person={person}/>
              <h3 className="name">{person.name}</h3>
              <div className="techContainer">
                <h4 className="techChip">{person.tech_one}</h4>
                <h4 className="techChip">{person.tech_two}</h4>
                <h4 className="techChip">{person.tech_three}</h4>
              </div>
            </div>
          </TinderCard> 
        ))}
        
      </div>

    </div>
  );
        
};

export default HomeCard;
