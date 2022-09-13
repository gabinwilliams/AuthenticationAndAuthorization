import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import userProfiles from "./userProfiles.reducer";
import userLikes from "./userLikes.reducer";
import fetchUserLikes from "./fetchUserLikes.reducer";
import chat from "./chat.reducer";
import messages from "./messages.reducer";
import currentChat from "./currentChat.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  userProfiles,
  userLikes,
  fetchUserLikes,
  chat,
  messages,
  currentChat,
});

export default rootReducer;
