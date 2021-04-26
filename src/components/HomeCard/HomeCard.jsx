import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeModal from '../HomeModal/HomeModal';
import TinderCard from 'react-tinder-card';
import axios from "axios";
import './HomeCard.css';
import { array } from "prop-types";



const HomeCard = () => {
  const dispatch = useDispatch();
  
  
  const user = useSelector((store) => store.user);
  const fetchUserLikes = useSelector((store) => store.fetchUserLikes);
  const userProfiles = useSelector((store) => store.userProfiles);
  const [open, setOpen] = useState(false);
  
  
 

  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
    dispatch({ type: 'FETCH_LIKES'});

  }, [dispatch] );


  const onSwipe = (id, direction) => { 
    console.log('You swiped: ', direction)
   

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
        // dispatch({type: 'FETCH_USER_LIKES'})
        dispatch({type: 'FETCH_LIKES'});
      })
      .catch((err) => {
        console.log("Error in POST", err);
      });
      
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

     

        
      
      }
      
  }
  const filterArray = () => {
    let newNewArray = userProfiles.filter(data => data.id != user.id);
    let likedArray = fetchUserLikes.filter(data => data.username == user.username && data.liked == true);
    let newArray = userProfiles.filter(data => data.id != user.id);

    let finalArray = [];
      
      
      


      if(fetchUserLikes.length != 0) {
        for(let i = 0; i < newArray.length; i++) {
          for(let z = 0; z < likedArray.length; z++) {
              if(newArray[i].id === likedArray[z].liked_user_id){
              console.log('This will be pushed to FinalArray:', likedArray[z].liked_user_id);
              
                console.log(newArray.indexOf(newArray[i]));
                let indexToRemove = newArray.indexOf(newArray[i]);
                newNewArray.splice(indexToRemove, 100)
                 }    
               
            
          }// end for z
          
          // console.log('newNewArray filtered', newNewArray);
        }

        console.log('This is final filtered Array:', newNewArray);
        
        return newNewArray;
      }

 
  console.log('returned the normal array because not likes yet', newArray);
  return newArray;
  }


  let profileArray = filterArray();
  


  
 
  


  
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
