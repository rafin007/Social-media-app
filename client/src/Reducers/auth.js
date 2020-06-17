import * as actionTypes from '../Actions/actionTypes';

const initalState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: false,
    errors: []
};

const authReducer = (state = initalState, action) => {
    const { type, payload } = action;

    switch (type) {

        case actionTypes.USER_LOADED:
            return {
                ...state,
                user: payload,
                loading: false,
                isAuthenticated: true
            };

        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };

        case actionTypes.REGISTER_FAIL:
        case actionTypes.AUTH_ERROR:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                errors: payload,
                user: null
            };

        case actionTypes.LOADING:
            return {
                ...state,
                loading: true
            };

        case actionTypes.FOLLOW_USER:
        case actionTypes.UNFOLLOW_USER:
            return {
                ...state,
                loading: false,
                user: payload
            };

        case actionTypes.GET_PROFILES:
            return {
                ...state,
                loading: false
            }

        default:
            return state;

    }
};

export default authReducer;