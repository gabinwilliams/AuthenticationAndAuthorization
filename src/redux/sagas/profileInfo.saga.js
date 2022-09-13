import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// worker Saga: will be fired on "REGISTER" actions
function* registerUserInfo(action) {
  try {
    // passes the username and password from the payload to the server
    yield axios.post("/api/user/registerInfo", action.payload);
    yield put({ type: "FETCH_USER" });
  } catch (error) {
    console.log("Error with user registration:", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}

function* updateUserLikes(action) {
  try {
    yield put({ type: "RESET_STATE" });
    yield put({ type: "UPDATE_LIKE_COUNT", payload: action.payload });
  } catch {
    console.log("Error in RESET COUNT");
  }
  yield put({ type: "UPDATE_LIKED_OBJECT" });
}

function* updateLikedId(action) {
  try {
    yield put({ type: "UPDATE_LIKED_USER_ID", payload: action.payload });
  } catch (error) {
    console.log("Error with POST updating Likes", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}

function* updateMatch(action) {
  try {
    yield axios.put("/api/profile/match", action.payload);
    yield put({ type: "FETCH_LIKES" });
  } catch (error) {
    console.log("Error with PUT updating match", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}

function* profileInfoSaga() {
  yield takeLatest("UPDATE_PROFILE", registerUserInfo);
  yield takeLatest("UPDATE_LIKES", updateUserLikes);
  yield takeLatest("UPDATE_LIKED_ID", updateLikedId);
  yield takeLatest("UPDATE_MATCH", updateMatch);
}

export default profileInfoSaga;
