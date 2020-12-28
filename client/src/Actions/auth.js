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
  //clear the profile and post first, reset theme and then logout
  // dispatch({
  //   type: actionTypes.CLEAR_PROFILE,
  // });
  // dispatch({
  //   type: actionTypes.CLEAR_POST,
  // });
  // dispatch({
  //   type: actionTypes.CLEAR_POSTS,
  // });
  // dispatch({
  //   type: actionTypes.RESET_THEME,
  // });
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

//---------------get current theme-------------
export const getCurrentTheme = () => async (dispatch) => {
  try {
    const response = await axios.get("/users/get/theme");

    dispatch({
      type: actionTypes.GET_THEME,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//-------------------Switch theme--------------
export const switchTheme = () => async (dispatch) => {
  try {
    const response = await axios.patch("/users/switch/theme");

    dispatch({
      type: actionTypes.SWITCH_THEME,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// //---------------get user privacy-------------
// export const getUserPrivacy = () => async (dispatch) => {
//   try {
//     const response = await axios.get("/users/get/privacy");

//     dispatch({
//       type: actionTypes.GET_THEME,
//       payload: response.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

//------------------Switch privacy--------------------
export const switchPrivacy = () => async (dispatch) => {
  try {
    const response = await axios.put("/users/isPrivate");

    dispatch({
      type: actionTypes.SWITCH_PRIVACY,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//--------------------Change password----------------------
export const changePassword = ({
  oldPassword,
  newPassword,
  confirmNewPassword,
}) => async (dispatch) => {
  config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    oldPassword,
    newPassword,
    confirmPassword: confirmNewPassword,
  });

  try {
    //loading first
    dispatch({
      type: actionTypes.LOADING,
    });

    const response = await axios.patch("/users/changePassword", body, config);

    dispatch({
      type: actionTypes.CHANGE_PASSWORD,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CHANGE_PASSWORD_ERROR,
      payload: error?.response?.data?.msg,
    });
  }
};

//--------------------Change name----------------------
export const changeName = ({ name }) => async (dispatch) => {
  config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    name,
  });

  try {
    //loading first
    dispatch({
      type: actionTypes.LOADING,
    });

    const response = await axios.patch("/users/changeName", body, config);

    dispatch({
      type: actionTypes.CHANGE_NAME,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CHANGE_NAME_ERROR,
      payload: error?.response?.data?.msg,
    });
  }
};

//--------------------Change email----------------------
export const changeEmail = ({ email }) => async (dispatch) => {
  config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
  });

  try {
    //loading first
    dispatch({
      type: actionTypes.LOADING,
    });

    const response = await axios.patch("/users/changeEmail", body, config);

    dispatch({
      type: actionTypes.CHANGE_EMAIL,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CHANGE_EMAIL_ERROR,
      payload: error?.response?.data?.msg,
    });
  }
};

//clear message
export const clearMessage = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_MESSAGE,
  });
};
