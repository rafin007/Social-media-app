import * as actionTypes from "./actionTypes";
import axios from "axios";

//----------get all chats of logged in user---------
export const getAllChats = () => async (dispatch) => {
  try {
    //loading first
    dispatch({
      type: actionTypes.CHATS_LOADING,
    });

    const response = await axios.get("/chat");

    //send back data
    dispatch({
      type: actionTypes.GET_ALL_CHATS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};
