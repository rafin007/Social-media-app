import axios from 'axios';
import * as actionTypes from './actionTypes';
import setAuthToken from '../utils/setAuthToken';


//--------------Load user--------------------------
export const loadUser = () => async dispatch => {
    //if there is token in localStorage then set it in axios header
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        //check if the associated token in axios header fetches an user
        const response = await axios.get('/auth');

        dispatch({
            type: actionTypes.USER_LOADED,
            payload: response.data
        });

    } catch (err) {
        const errors = err.response.data.errors;

        dispatch({
            type: actionTypes.AUTH_ERROR,
            payload: errors.map(error => error.msg)
        });
    }
}

//--------------register user-------------------------
export const register = ({ name, email, password, gender }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, gender });

    try {
        //loading first
        dispatch({
            type: actionTypes.REGISTER_LOADING
        });

        const response = await axios.post('/users', body, config);

        //send back data from server
        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: response.data
        });

    } catch (err) {

        const errors = err.response.data.errors;

        dispatch({
            type: actionTypes.REGISTER_FAIL,
            payload: errors.map(error => error.msg)
        });
    }
}