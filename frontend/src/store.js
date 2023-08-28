import { createStore, combineReducers, applyMiddleware } from "redux";
// import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  allUsersReducer,
  myPostReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/userReducer.js";

import { likeReducer, userPostReducer } from "./Reducers/postReducer.js";

const reducer = combineReducers({
  user: userReducer,
  postOfFollowing: postOfFollowingReducer,
  allUsers: allUsersReducer,
  like: likeReducer,
  myPosts: myPostReducer,
  userProfile: userProfileReducer,
  userPosts: userPostReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
