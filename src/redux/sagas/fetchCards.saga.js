import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getUserProfiles() {
  try {
    const profiles = yield axios.get("/api/profile");
    console.log("GET if getting:", profiles.data);
    yield put({ type: "FETCH_PROFILES", payload: profiles.data });
  } catch {
    console.log("Error in GET getProfiles");
  }
}

function* fetchUserLikes() {
  try {
    const userLikes = yield axios.get("/api/profile/likes");
    console.log("GET if getting:", userLikes.data);
    yield put({ type: "FETCH_USER_LIKES", payload: userLikes.data });
  } catch {
    console.log("Error in GET getProfiles");
  }
}

function* fetchCardsSaga() {
  yield takeLatest("FETCH_CARDS", getUserProfiles);
  yield takeLatest("FETCH_LIKES", fetchUserLikes);
}

export default fetchCardsSaga;
