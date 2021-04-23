
const userLikesReducer = (state = [], action) => {

  switch (action.type) {
    case 'UPDATE_LIKE_COUNT':
      state = [...state, action.payload];
      
      return state;
    case 'UPDATE_LIKED_USER_ID':
      state = [...state, action.payload];
      return state;
    case 'RESET_STATE':
      state = [];
      return state;
    default:
      return state;
  }

  
};


export default userLikesReducer;