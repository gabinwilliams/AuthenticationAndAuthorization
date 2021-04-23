import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import TinderCard from 'react-tinder-card';
import './HomeCard.css';



const HomeCard = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const userLikes = useSelector((store) => store.userLikes);
  const userProfiles = useSelector((store) => store.userProfiles);
  
  

  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
    
  }, []);

 

  const onSwipe = (direction) => { 
    console.log('You swiped: ', direction)
    
      if(direction === 'right') {
       
      dispatch({type: "UPDATE_LIKES", payload: true})
    }
      if(direction === 'left') {
        dispatch({type: "UPDATE_LIKES", payload: false})
      }
      
  }
  
  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier, ' left the screen')
    
    dispatch({type: "UPDATE_LIKED_ID", payload: myIdentifier})
   
  }

  const sendLikesObject = () => {
    console.log('Current user likes: ', userLikes);

    dispatch({type: "UPDATE_LIKED_OBJECT", payload: userLikes})
  }
  
  
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
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen( person.id)}
            
            // prop from tinder-card library to prevent swiping up or down
            preventSwipe={['up', 'down']}
          >
            <div 
            className="card"
              
            style={{backgroundImage: `url(${person.profile_image})`}}
            >
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
