import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  profile: null,
  profiles: [],
  searchedProfiles: [],
  loading: false,
  errors: [],
  loadFollow: false,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_PROFILE:
    case actionTypes.POST_PERSONAL:
    case actionTypes.ADD_BIO:
    case actionTypes.POST_EDUCATIONAL:
    case actionTypes.POST_EXPERIENCE:
    case actionTypes.POST_SOCIAL:
    case actionTypes.DELETE_EDUCATIONAL:
    case actionTypes.DELETE_EXPERIENCE:
    case actionTypes.DELETE_SOCIAL:
      return {
        ...state,
        loading: false,
        profile: payload,
      };

    case actionTypes.PROFILE_ERROR:
    case actionTypes.BIO_ERROR:
    case actionTypes.PERSONAL_ERROR:
    case actionTypes.EDUCATIONAL_ERROR:
    case actionTypes.EXPERIENCE_ERROR:
    case actionTypes.SOCIAL_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case actionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: [],
      };

    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload,
      };

    case actionTypes.LOAD_FOLLOW:
      return {
        ...state,
        loadFollow: true,
      };

    case actionTypes.GET_FOLLOWERS:
    case actionTypes.GET_FOLLOWINGS:
    case actionTypes.GET_FOLLOW_REQUESTS:
      return {
        ...state,
        loadFollow: false,
        profiles: payload,
      };

    case actionTypes.FOLLOW_USER:
    case actionTypes.UNFOLLOW_USER:
    case actionTypes.REMOVE_AVATAR:
    case actionTypes.SET_AVATAR:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.SEARCH_PROFILE:
      return {
        ...state,
        searchedProfiles:
          state.profiles &&
          state.profiles.length > 0 &&
          state.profiles.filter((profile) => {
            if (
              profile.user.name.toUpperCase().includes(payload.toUpperCase())
            ) {
              return profile;
            } else {
              return null;
            }
          }),
      };

    case actionTypes.SEARCH_FOLLOWINGS:
      return {
        ...state,
        searchedProfiles:
          state.profiles &&
          state.profiles.length > 0 &&
          state.profiles.filter((profile) => {
            if (
              profile.user.name.toUpperCase().includes(payload.toUpperCase())
            ) {
              return profile;
            } else {
              return null;
            }
          }),
      };

    case actionTypes.CLEAR_SEARCH_PROFILES:
      return {
        ...state,
        searchedProfiles: [],
      };

    case actionTypes.CLEAR_PROFILES:
      return {
        ...state,
        profiles: [],
      };

    default:
      return state;
  }
};

export default profileReducer;
