import * as actionTypes from '../actionTypes';

const initialState = {

};

const authReducer = (state = initialState, actions) => {
    switch (actions.types) {
        case actionTypes.SIGNUP_FINISHED:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default authReducer;