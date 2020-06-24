import axios from 'axios';
import * as actionTypes from './actionTypes';

//axios config
const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

//-------------create post-----------------
export const createPost = (formData) => async dispatch => {
    try {

        //loading first
        dispatch({ type: actionTypes.LOADING });

        const response = await axios.post('/posts', formData, config);

        dispatch({
            type: actionTypes.CREATE_POST,
            payload: response.data
        });


    } catch (err) {
        const errors = err.response.data.errors;

        dispatch({
            type: actionTypes.POST_ERROR,
            payload: errors.map(error => error.msg)
        });
    }
};