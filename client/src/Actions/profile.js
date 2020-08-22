import axios from "axios";
import * as actionTypes from "./actionTypes";

//axios config
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//------------get the profile of the user that is logged in---------------------
export const getCurrentProfile = () => async (dispatch) => {
  try {
    //loading first
    dispatch({
      type: actionTypes.LOADING,
    });

    const response = await axios.get("/profile/me");

    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.BIO_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//---------------add bio--------------------------------
export const addBio = ({ bio }) => async (dispatch) => {
  const body = JSON.stringify({ bio });

  try {
    // dispatch({
    //   type: actionTypes.LOADING,
    // });

    const response = await axios.post("/profile/bio", body, config);

    dispatch({
      type: actionTypes.ADD_BIO,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.BIO_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//-------------post personal information---------------
export const postPersonalInformation = ({
  address,
  birthday,
  profession,
  website,
}) => async (dispatch) => {
  const body = JSON.stringify({ address, birthday, profession, website });

  try {
    //loading first
    // dispatch({
    //   type: actionTypes.LOADING,
    // });

    //send data
    const response = await axios.post("/profile/personal", body, config);

    dispatch({
      type: actionTypes.POST_PERSONAL,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.PERSONAL_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//-------------post educational information---------------
export const postEducationalInformation = ({ school, degree }) => async (
  dispatch
) => {
  const body = JSON.stringify({ school, degree });

  try {
    //loading first
    // dispatch({
    //   type: actionTypes.LOADING,
    // });

    //send data
    const response = await axios.post("/profile/education", body, config);

    dispatch({
      type: actionTypes.POST_EDUCATIONAL,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.EDUCATIONAL_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//------------------delete educational info by id-----------------
export const deleteEducationalInformation = (id) => async (dispatch) => {
  try {
    //loading first
    // dispatch({
    //   type: actionTypes.LOADING,
    // });

    const response = await axios.delete(`/profile/education/${id}`);

    dispatch({
      type: actionTypes.DELETE_EDUCATIONAL,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//-------------post educational information---------------
export const postExperienceInformation = ({ company, title }) => async (
  dispatch
) => {
  const body = JSON.stringify({ company, title });

  try {
    //loading first
    // dispatch({
    //   type: actionTypes.LOADING,
    // });

    //send data
    const response = await axios.post("/profile/experience", body, config);

    dispatch({
      type: actionTypes.POST_EXPERIENCE,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.EXPERIENCE_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//------------------delete experience info by id-----------------
export const deleteExperienceInformation = (id) => async (dispatch) => {
  try {
    //loading first
    // dispatch({
    //   type: actionTypes.LOADING,
    // });

    const response = await axios.delete(`/profile/experience/${id}`);

    dispatch({
      type: actionTypes.DELETE_EXPERIENCE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//-------------post social information---------------
export const postSocialInformation = ({ name, username }) => async (
  dispatch
) => {
  const body = JSON.stringify({ name, username });

  try {
    //loading first
    // dispatch({
    //   type: actionTypes.LOADING,
    // });

    //send data
    const response = await axios.post("/profile/social", body, config);

    dispatch({
      type: actionTypes.POST_SOCIAL,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.SOCIAL_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//------------------delete social info by id-----------------
export const deleteSocialInformation = (id) => async (dispatch) => {
  try {
    //loading first
    // dispatch({
    //   type: actionTypes.LOADING,
    // });

    const response = await axios.delete(`/profile/social/${id}`);

    dispatch({
      type: actionTypes.DELETE_SOCIAL,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//------------------ get all profiles-----------------------
export const getAllProfiles = () => async (dispatch) => {
  //clear personal profile to avoid conflict
  dispatch({ type: actionTypes.CLEAR_PROFILE });

  try {
    //loading first
    dispatch({ type: actionTypes.LOADING });

    const response = await axios.get("/profile");

    dispatch({
      type: actionTypes.GET_PROFILES,
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

//----------------Get profile by ID-------------------------
export const getProfileById = (id) => async (dispatch) => {
  try {
    //loading first
    dispatch({ type: actionTypes.LOADING });

    const response = await axios.get(`/profile/${id}`);

    dispatch({
      type: actionTypes.GET_PROFILE,
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

//----------------Get profile by User ID-------------------------
export const getProfileByUserId = (id) => async (dispatch) => {
  try {
    //loading first
    // dispatch({ type: actionTypes.LOADING });

    const response = await axios.get(`/profile/user/${id}`);

    console.log(response.data);

    dispatch({
      type: actionTypes.GET_PROFILE,
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

//---------------Search profile----------------
export const searchProfileByName = (name) => async (dispatch) => {
  dispatch({
    type: actionTypes.SEARCH_PROFILE,
    payload: name,
  });
};
