import * as actionTypes from '../Actions/actionTypes';

const initalState = {
    posts: [],
    post: null,
    errors: [],
    loading: false
};

const postReducer = (state = initalState, action) => {
    const { type, payload } = action;

    switch (type) {

        case actionTypes.POST_LOADING:
            return {
                ...state,
                loading: true
            }

        case actionTypes.CREATE_POST:
        case actionTypes.EDIT_POST:
        case actionTypes.GET_POST:
            return {
                ...state,
                loading: false,
                post: payload
            }

        case actionTypes.POST_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }

        case actionTypes.CLEAR_POST:
            return {
                ...state,
                post: null
            }

        case actionTypes.GET_USER_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload
            }

        default:
            return state;
    }
}

export default postReducer;