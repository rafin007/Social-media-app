import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: false,
  followLoading: false,
  errors: [],
  error: null,
  theme: "light",
  privacy: false,
  success: null,
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
        privacy: payload.isPrivate,
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

    case actionTypes.CANCEL_FOLLOW_REQUEST:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.GET_PROFILES:
    case actionTypes.GET_PROFILE:
    case actionTypes.GET_FOLLOWERS:
    case actionTypes.GET_FOLLOWINGS:
    case actionTypes.GET_FOLLOW_REQUESTS:
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

    case actionTypes.FOLLOW_REQ_LOADING:
      return {
        ...state,
        followLoading: true,
      };

    case actionTypes.ACCEPT_FOLLOW_REQUEST:
    case actionTypes.REJECT_FOLLOW_REQUEST:
      return {
        ...state,
        followLoading: false,
        user: payload,
      };

    case actionTypes.FOLLOW_ERROR:
      return {
        ...state,
        followLoading: false,
        error: payload,
      };

    case actionTypes.SWITCH_PRIVACY:
      return {
        ...state,
        user: payload,
        privacy: payload.isPrivate,
      };

    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        loading: false,
        success: payload.msg,
      };

    case actionTypes.CHANGE_EMAIL:
    case actionTypes.CHANGE_NAME:
      return {
        ...state,
        loading: false,
        success: payload.msg,
        user: payload.user,
      };

    case actionTypes.CHANGE_PASSWORD_ERROR:
    case actionTypes.CHANGE_NAME_ERROR:
    case actionTypes.CHANGE_EMAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case actionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        error: null,
        success: null,
        errors: [],
      };

    default:
      return state;
  }
};

export default authReducer;
