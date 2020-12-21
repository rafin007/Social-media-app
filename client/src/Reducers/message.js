import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  chat: null,
  chats: [],
  messages: [],
  chatsLoading: false,
  errors: null,
  threads: [],
  socket: null,
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_ALL_CHATS:
      return {
        ...state,
        chatsLoading: false,
        chats: payload,
        // chats: state.threads && state.threads.length > 0 && state.threads.filter(thread => {

        // })
      };

    // case actionTypes.GET_CHAT:
    //   return {
    //     ...state,
    //     chatsLoading: false,
    //     chat: payload,
    //     // threads: state.threads.concat(payload),
    //   };

    // case actionTypes.GET_ALL_MESSAGES:
    //   return {
    //     ...state,
    //     chatsLoading: false,
    //     messages: payload,
    //   };

    case actionTypes.SAVE_SOCKET:
      return {
        ...state,
        socket: payload,
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

    case actionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default messageReducer;
