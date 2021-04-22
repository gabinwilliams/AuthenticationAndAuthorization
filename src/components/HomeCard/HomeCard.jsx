import React, {useState, useEffect} from "react";
import TinderCard from 'react-tinder-card';
import './HomeCard.css';



const HomeCard = () => {

  const [people, setPeople] = useState([

    {
      name: 'Steve Jobs',
      url: 'https://hs-marketing.imgix.net/images/blog/steve-jobs.jpg?auto=compress&fit=scale&w=1200&h=673&dpr=1',
    },
    {
      name: 'batman',
      url: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fbatman-arkham-knight%2FEGS_WB_Batman_Arkham_Knight_G1_1920x1080_19_0911-1920x1080-1d69e15f00cb5ab57249f208f1f8f45d52cbbc59.jpg?h=1080&resize=1&w=1920',
    }

  ]);

  useEffect(() => {
    // getGalleryItems();
  }, []);

  // GET REQUEST for GalleryList
  // const getUserCards = () => {
  //   axios
  //     .get("/gallery")
  //     .then((response) => {
  //       setGalleryList(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (

    <div>
      
      <div className="cardContainer">
        {people.map(person => (
          <TinderCard 
            key={person.name}
            className="swipe"
            // prop from tinder-card library to prevent swiping up or down
            preventSwipe={['up', 'down']}
          >
            <div 
            className="card"
            style={{backgroundImage: `url(${person.url})`}}
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard> 
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
