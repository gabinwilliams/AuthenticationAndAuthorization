import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeModal from '../HomeModal/HomeModal';
import TinderCard from 'react-tinder-card';
import HomeAppBar from '../HomeAppBar/HomeAppBar';
import axios from "axios";
import './HomeCard.css';
import { array } from "prop-types";



const HomeCard = () => {
  const dispatch = useDispatch();
  
  
  const user = useSelector((store) => store.user);
  const fetchUserLikes = useSelector((store) => store.fetchUserLikes);
  const userProfiles = useSelector((store) => store.userProfiles);
 
  
  let filteredProfiles = userProfiles.filter(data => data.id != user.id);
 

  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
    dispatch({ type: 'FETCH_LIKES'});

  }, [] );


  const onSwipe = (id, direction) => { 
    console.log('You swiped: ', direction)
   

      if(direction === 'right') {
        direction = true;
        let obj = {
          user_id: user.id,
          liked: direction,
          liked_user_id: id
        }
console.log('Swiped person:', obj);
        axios
      .post("/api/user/updateLikes", obj)
      .then((response) => {
        console.log('POST obj from Swipe:', response);
        // dispatch({type: 'FETCH_USER_LIKES'})
        dispatch({type: 'FETCH_LIKES'});
      })
      .catch((err) => {
        console.log("Error in POST", err);
      });
      
    }
      // if(direction === 'left') {
      //   direction = false;

      //   let obj = {
      //     user_id: user.id,
      //     liked: direction,
      //     liked_user_id: id
      //   }
      //   axios
      // .post("/api/user/updateLikes", obj)
      // .then((response) => {
      //   console.log('POST obj from Swipe:', response);
      //   // dispatch({type: 'FETCH_LIKES'});
      // })
      // .catch((err) => {
      //   console.log("Error in POST", err);
      // });

      // }
      
  }
  
  console.log('filtered array: ', filteredProfiles);
  
  return (
    
    <div>
      
      <div className="cardContainer">
      
        {filteredProfiles.map(person => (
          <>
          {/* <HomeModal  person={person}/> */}
          <TinderCard 
            key={person.name}
            className="swipe"
            // onCardLeftScreen={() => onCardLeftScreen( person.id)}
            onSwipe={(direction) => onSwipe(person.id, direction)}
            
            // prop from tinder-card library to prevent swiping up or down
            preventSwipe={['up', 'down']}
          >
             
            <div key={person.name}
            className="card"
              
            style={{backgroundImage: `url(${person.profile_image})`}}
            >
              
              <HomeModal key={person.name}  person={person}/>
              <h3 className="name">{person.name}</h3>
              <div className="techContainer">
                <h4 className="techChip">{person.tech_one}</h4>
                <h4 className="techChip">{person.tech_two}</h4>
                <h4 className="techChip">{person.tech_three}</h4>
                
                
              </div>
              
            </div>
        

          </TinderCard> 
          </>
        ))}
        
      </div>

    </div>
  );
        
};

export default HomeCard;
