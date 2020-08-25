import axios from "axios";
import * as actionTypes from "./actionTypes";
import { getProfileById } from "./profile";

// export const checkFollow = (id) => async dispatch => {
//     try {
//         //loading first
//         dispatch({ type: actionTypes.LOADING });

//         const response = await axios.get(`/users/checkFollow/${id}`);

//         dispatch({
//             type: actionTypes.CHECK_FOLLOW,
//             payload: response.data
//         });

//     } catch (err) {
//         const errors = err.response.data.errors;

//         dispatch({
//             type: actionTypes.PROFILE_ERROR,
//             payload: errors.map(error => error.msg)
//         });
//     }
// };

//--------------follow user by id---------------------
export const followUserById = (user_id, id = null) => async (dispatch) => {
  try {
    //loading first
    dispatch({ type: actionTypes.FOLLOW_LOADING });

    const response = await axios.put(`/users/follow/${user_id}`);

    //send back data
    dispatch({
      type: actionTypes.FOLLOW_USER,
      payload: response.data,
    });

    //get other profile
    if (id) {
      dispatch(getProfileById(id));
    }
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//--------------follow user by id---------------------
export const unfollowUserById = (user_id, id = null) => async (dispatch) => {
  try {
    //loading first
    dispatch({ type: actionTypes.FOLLOW_LOADING });

    const response = await axios.put(`/users/unfollow/${user_id}`);

    //send back data
    dispatch({
      type: actionTypes.UNFOLLOW_USER,
      payload: response.data,
    });

    //get other profile
    if (id) {
      dispatch(getProfileById(id));
    }
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//----------------Get followers' profiles for a particular user---------------------
export const getFollowers = (user_id = null) => async (dispatch) => {
  try {
    //loading first
    dispatch({ type: actionTypes.LOADING });
    dispatch({ type: actionTypes.CLEAR_PROFILE });

    let response = null;

    if (user_id) {
      response = await axios.get(`/users/followers/${user_id}`);
    } else {
      response = await axios.get("/users/followers");
    }

    dispatch({
      type: actionTypes.GET_FOLLOWERS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//----------------Get followings' profiles for a particular user---------------------
export const getFollowings = (user_id = null) => async (dispatch) => {
  try {
    //loading first
    dispatch({ type: actionTypes.LOADING });
    dispatch({ type: actionTypes.CLEAR_PROFILE });

    let response = null;

    if (user_id) {
      response = await axios.get(`/users/following/${user_id}`);
    } else {
      response = await axios.get("/users/following");
    }

    dispatch({
      type: actionTypes.GET_FOLLOWINGS,
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
