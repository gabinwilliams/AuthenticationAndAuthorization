import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeModal from "../HomeModal/HomeModal";
import TinderCard from "react-tinder-card";
import HomeAppBar from "../HomeAppBar/HomeAppBar";
import axios from "axios";
import "./HomeCard.css";
import { array } from "prop-types";

const HomeCard = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const fetchUserLikes = useSelector((store) => store.fetchUserLikes);
  const userProfiles = useSelector((store) => store.userProfiles);

  let filteredProfiles = userProfiles.filter((data) => data.id != user.id);

  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
    dispatch({ type: "FETCH_LIKES" });
  }, []);

  const onSwipe = (id, direction) => {
    if (direction === "right") {
      direction = true;
      let obj = {
        user_id: user.id,
        liked: direction,
        liked_user_id: id,
      };
      axios
        .post("/api/user/updateLikes", obj)
        .then((response) => {
          dispatch({ type: "FETCH_LIKES" });
        })
        .catch((err) => {
          console.log("Error in POST", err);
        });
    }
  };

  return (
    <div>
      <div className="cardContainer">
        {filteredProfiles.map((person) => (
          <>
            <TinderCard
              key={person.name}
              className="swipe"
              onSwipe={(direction) => onSwipe(person.id, direction)}
              preventSwipe={["up", "down"]}
            >
              <div
                key={person.name}
                className="card"
                style={{ backgroundImage: `url(${person.profile_image})` }}
              >
                <HomeModal key={person.name} person={person} />
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
