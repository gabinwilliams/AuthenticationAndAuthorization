import axios from 'axios';
const messagesReducer = (state = [], action) => {

  switch (action.type) {
    case 'UPDATE_MESSAGES':
      console.log('In messages reducer:', action.payload);
      state = action.payload;
      return state;
   
      default:
      return state;
  }


};


export default messagesReducer;