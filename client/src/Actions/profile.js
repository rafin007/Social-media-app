import axios from 'axios';
import * as actionTypes from './actionTypes';

//axios config
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

//------------get the profile of the user that is logged in---------------------
export const getCurrentProfile = () => async dispatch => {
    try {

        //loading first
        dispatch({
            type: actionTypes.LOADING
        });

        const response = await axios.get('/profile/me');

        dispatch({
            type: actionTypes.GET_PROFILE,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

//---------------add bio--------------------------------
export const addBio = ({ bio }) => async dispatch => {
    const body = JSON.stringify({ bio });

    try {
        dispatch({
            type: actionTypes.LOADING
        });

        const response = await axios.post('/profile/bio', body, config);

        dispatch({
            type: actionTypes.ADD_BIO,
            payload: response.data
        });

    } catch (err) {
        const errors = err.response.data.errors;

        dispatch({
            type: actionTypes.BIO_ERROR,
            payload: errors.map(error => error.msg)
        });
    }
}

//-------------post personal information---------------
export const postPersonalInformation = ({ address, birthday, profession, website }) => async dispatch => {

    const body = JSON.stringify({ address, birthday, profession, website });

    try {
        //loading first
        dispatch({
            type: actionTypes.LOADING
        });

        //send data
        const response = await axios.post('/profile/personal', body, config);

        dispatch({
            type: actionTypes.POST_PERSONAL,
            payload: response.data
        });

    } catch (err) {
        const errors = err.response.data.errors;

        dispatch({
            type: actionTypes.PERSONAL_ERROR,
            payload: errors.map(error => error.msg)
        });
    }
};