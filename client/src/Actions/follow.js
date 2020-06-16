import axios from 'axios';
import * as actionTypes from './actionTypes';

export const checkFollow = (id) => async dispatch => {
    try {
        //loading first
        dispatch({ type: actionTypes.LOADING });

        const response = await axios.get(`/users/checkFollow/${id}`);

        dispatch({
            type: actionTypes.CHECK_FOLLOW,
            payload: response.data
        });

    } catch (err) {
        const errors = err.response.data.errors;

        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: errors.map(error => error.msg)
        });
    }
};

export const checkFollowBored = async id => {
    try {
        const response = await axios.get(`/users/checkFollow/${id}`);

        return response.data.status;
    } catch (error) {
        console.log(error);
    }
};