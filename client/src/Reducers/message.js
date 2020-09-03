import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  chats: [],
  messages: [],
  chatsLoading: false,
  errors: null,
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_ALL_CHATS:
      return {
        ...state,
        chatsLoading: false,
        chats: payload,
      };

    case actionTypes.CHATS_LOADING:
      return {
        ...state,
        chatsLoading: true,
      };

    case actionTypes.MESSAGES_ERROR:
      return {
        ...state,
        chatsLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};

export default messageReducer;
