import axios from 'axios';
const userLikesReducer = (state = {}, action) => {

  switch (action.type) {
    case 'UPDATE_LIKE_COUNT':
      console.log('User swiped?', action.payload);
      state = {...state, liked: action.payload};
      
      return state;
    case 'UPDATE_LIKED_USER_ID':
      console.log('User id?', action.payload);
      state = {...state, liked_user_id: action.payload};

      return state;
    case 'RESET_STATE':
      state = [];
      return state;
    default:
      return state;
  }

  
};


export default userLikesReducer;