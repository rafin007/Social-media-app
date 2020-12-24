import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: false,
  errors: [],
  theme: "light",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.USER_LOADED:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
        theme: payload.theme,
      };

    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case actionTypes.REGISTER_FAIL:
    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: payload,
        user: null,
      };

    case actionTypes.LOGOUT:
      localStorage.removeItem("token");
      return initialState;

    case actionTypes.LOADING:
    case actionTypes.FOLLOW_LOADING:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FOLLOW_USER:
    case actionTypes.UNFOLLOW_USER:
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case actionTypes.GET_PROFILES:
    case actionTypes.GET_PROFILE:
    case actionTypes.GET_FOLLOWERS:
    case actionTypes.GET_FOLLOWINGS:
    case actionTypes.ADD_BIO:
      // case actionTypes.POST_EDUCATIONAL:
      // case actionTypes.POST_EXPERIENCE:
      // case actionTypes.POST_SOCIAL:
      // case actionTypes.POST_PERSONAL:
      // case actionTypes.DELETE_EDUCATIONAL:
      // case actionTypes.DELETE_EXPERIENCE:
      // case actionTypes.DELETE_SOCIAL:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.REMOVE_AVATAR:
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case actionTypes.SET_AVATAR:
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case actionTypes.SWITCH_THEME:
    case actionTypes.GET_THEME:
      return {
        ...state,
        theme: payload.theme,
      };

    case actionTypes.RESET_THEME:
      return {
        ...state,
        theme: "light",
      };

    default:
      return state;
  }
};

export default authReducer;
