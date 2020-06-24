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

        case actionTypes.LOADING:
            return {
                ...state,
                loading: true
            }

        case actionTypes.CREATE_POST:
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

        default:
            return state;
    }
}

export default postReducer;