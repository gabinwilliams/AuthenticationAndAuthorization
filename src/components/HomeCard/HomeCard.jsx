import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import TinderCard from 'react-tinder-card';
import './HomeCard.css';



const HomeCard = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const userProfiles = useSelector((store) => store.userProfiles);
  // const [people, setPeople] = useState([

  //   {
  //     name: 'Steve Jobs',
  //     url: 'https://hs-marketing.imgix.net/images/blog/steve-jobs.jpg?auto=compress&fit=scale&w=1200&h=673&dpr=1',
  //   },
  //   {
  //     name: 'batman',
  //     url: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fbatman-arkham-knight%2FEGS_WB_Batman_Arkham_Knight_G1_1920x1080_19_0911-1920x1080-1d69e15f00cb5ab57249f208f1f8f45d52cbbc59.jpg?h=1080&resize=1&w=1920',
  //   }

  // ]);

  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
    
  }, []);

  
  const removeLoggedUserFromArray = () => {

    let newArray = userProfiles.filter(data => data.id != user.id);
    console.log('New state Array: ', newArray); 
    return newArray;
  }
  const profileArray = removeLoggedUserFromArray();

  
  removeLoggedUserFromArray();
  
console.log(userProfiles);

  
  return (

    <div>
      
      <div className="cardContainer">
        {profileArray.map(person => (

    

          <TinderCard 
            key={person.name}
            className="swipe"
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
