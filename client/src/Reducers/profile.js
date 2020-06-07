import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    profile: null,
    profiles: [],
    loading: false,
    errors: []
};

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case actionTypes.LOADING:
            return {
                ...state,
                loading: true
            }

        case actionTypes.GET_PROFILE:
        case actionTypes.POST_PERSONAL:
        case actionTypes.ADD_BIO:
            return {
                ...state,
                loading: false,
                profile: payload
            }

        case actionTypes.PROFILE_ERROR:
        case actionTypes.BIO_ERROR:
        case actionTypes.PERSONAL_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }

        // case actionTypes.ADD_BIO:
        //     return {
        //         ...state,
        //         loading: false,
        //         profile: payload
        //     }

        // case actionTypes.BIO_ERROR:
        //     return {
        //         ...state,
        //         loading: false,
        //         errors: payload
        //     }

        // case actionTypes.POST_PERSONAL:
        //     return {
        //         ...state,
        //         loading: false,

        //     }

        default:
            return state;
    }
}

export default profileReducer;