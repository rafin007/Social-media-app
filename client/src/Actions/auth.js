import axios from "axios";
import * as actionTypes from "./actionTypes";
import setAuthToken from "../utils/setAuthToken";

//axios config
let config = null;

//--------------Load user--------------------------
export const loadUser = () => async (dispatch) => {
  //if there is token in localStorage then set it in axios header
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    //check if the associated token in axios header fetches an user
    const response = await axios.get("/auth");

    dispatch({
      type: actionTypes.USER_LOADED,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch({
        type: actionTypes.AUTH_ERROR,
        payload: errors.map((error) => error.msg),
      });
    }
  }
};

//--------------register user-------------------------
export const register = ({ name, email, password, gender }) => async (
  dispatch
) => {
  config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password, gender });

  try {
    //loading first
    dispatch({
      type: actionTypes.LOADING,
    });

    const response = await axios.post("/users", body, config);

    //send back data from server
    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: response.data,
    });

    //load the user
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.REGISTER_FAIL,
      payload: errors.map((error) => error.msg),
    });
  }
};

//-----------------login user---------------------
export const login = ({ email, password }) => async (dispatch) => {
  config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    //loading first
    dispatch({
      type: actionTypes.LOADING,
    });

    const response = await axios.post("/auth", body, config);

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: response.data,
    });

    //load the user
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.REGISTER_FAIL,
      payload: errors.map((error) => error.msg),
    });
  }
};

//----------------LOGOUT---------------
export const logout = () => (dispatch) => {
  //clear the profile and post first and then logout
  dispatch({
    type: actionTypes.CLEAR_PROFILE,
  });
  dispatch({
    type: actionTypes.CLEAR_POST,
  });
  dispatch({
    type: actionTypes.CLEAR_POSTS,
  });
  dispatch({
    type: actionTypes.LOGOUT,
  });
};

//---------------Set avatar-------------------
export const setAvatar = (formData) => async (dispatch) => {
  config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    //loading first
    dispatch({ type: actionTypes.LOADING });

    const response = await axios.post("/users/me/avatar", formData, config);

    dispatch({
      type: actionTypes.SET_AVATAR,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//---------------Remove avatar---------------
export const removeUserAvatar = () => async (dispatch) => {
  //loading first
  dispatch({ type: actionTypes.LOADING });

  try {
    const response = await axios.delete("/users/me/avatar");

    dispatch({
      type: actionTypes.REMOVE_AVATAR,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};
