import axios from 'axios';
const fetchUserLikesReducer = (state = [], action) => {

  switch (action.type) {
    case 'FETCH_USER_LIKES':
      console.log('PayLoad for FETCH_USER_LIKES', action.payload);
    state = [...state, action.payload]
      return state;
      
  
    default:
      return state;
  }

  
};


export default fetchUserLikesReducer;