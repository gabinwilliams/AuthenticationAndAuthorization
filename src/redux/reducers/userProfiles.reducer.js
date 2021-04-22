
const userProfilesReducer = (state = [], action) => {

  switch (action.type) {
    case 'FETCH_PROFILES':
      state = action.payload;
      return state;
    default:
      return state;
  }

  
};


export default userProfilesReducer;