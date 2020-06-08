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
        case actionTypes.POST_EDUCATIONAL:
        case actionTypes.POST_EXPERIENCE:
        case actionTypes.POST_SOCIAL:
        case actionTypes.DELETE_EDUCATIONAL:
        case actionTypes.DELETE_EXPERIENCE:
        case actionTypes.DELETE_SOCIAL:
            return {
                ...state,
                loading: false,
                profile: payload
            }

        case actionTypes.PROFILE_ERROR:
        case actionTypes.BIO_ERROR:
        case actionTypes.PERSONAL_ERROR:
        case actionTypes.EDUCATIONAL_ERROR:
        case actionTypes.EXPERIENCE_ERROR:
        case actionTypes.SOCIAL_ERROR:
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