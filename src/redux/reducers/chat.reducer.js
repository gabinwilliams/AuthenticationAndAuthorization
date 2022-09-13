import axios from "axios";
const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHAT_ID":
      console.log("grabbing chat id:", action.payload);
      state = action.payload;

      return state;
    case "RESET_STATE":
      state = [];
      return state;
    default:
      return state;
  }
};

export default chatReducer;
