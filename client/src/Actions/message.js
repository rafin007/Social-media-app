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

//----------get chat of logged in user by id---------
export const getThreadById = (chat_id) => async (dispatch) => {
  try {
    //loading first
    dispatch({
      type: actionTypes.CHATS_LOADING,
    });

    const response = await axios.get(`/chat/${chat_id}`);

    //send back data
    dispatch({
      type: actionTypes.GET_ALL_MESSAGES,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

//----------save socket.io instance-------------
export const saveSocketInstance = (socket) => async (dispatch) => {
  dispatch({
    type: actionTypes.SAVE_SOCKET,
    payload: socket,
  });
};
