import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import message from "./message";

export default combineReducers({
  auth,
  profile,
  post,
  message,
});
