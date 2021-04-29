import axios from 'axios';
const currentChatReducer = (state = '', action) => {

  switch (action.type) {
    case 'CURRENT_CHAT':
      console.log('grabbing chat id:', action.payload);
      state = action.payload;
    
      return state;
   
    default:
      return state;
  }

  
};


export default currentChatReducer;