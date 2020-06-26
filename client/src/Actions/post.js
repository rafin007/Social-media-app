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
        dispatch({ type: actionTypes.POST_LOADING });

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


//-------------get post by id--------------------
export const getPostById = (post_id) => async dispatch => {
    //clear the post state
    dispatch({ type: actionTypes.CLEAR_POST });

    try {
        //then load
        dispatch({ type: actionTypes.POST_LOADING });

        const response = await axios.get(`/posts/${post_id}`);

        dispatch({
            type: actionTypes.GET_POST,
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


//-----------------clear post------------------------
export const clearPost = () => dispatch => {
    dispatch({ type: actionTypes.CLEAR_POST });
};


//-----------------get all posts of logged in user---------------
export const getAllPosts = () => async dispatch => {
    try {
        //loading first
        dispatch({ type: actionTypes.POST_LOADING });

        const response = await axios.get('/posts/me');

        dispatch({
            type: actionTypes.GET_USER_POSTS,
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


//-----------------get all posts of user by id---------------
export const getPostsByUserId = (user_id) => async dispatch => {
    try {
        //loading first
        dispatch({ type: actionTypes.POST_LOADING });

        const response = await axios.get(`/posts/users/${user_id}`);

        dispatch({
            type: actionTypes.GET_USER_POSTS,
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


// //---------------get post image by id----------------
// export const getPostImageById = (post_id) => async dispatch => {
//     try {
//         //loading first
//         dispatch({ type: actionTypes.POST_LOADING });

//         const response = await axios.get(`/posts/${post_id}/image`);

//         dispatch({
//             type: actionTypes.GET_POST_IMAGE,
//             payload: response
//         });

//     } catch (err) {
//         const errors = err.response.data.errors;

//         dispatch({
//             type: actionTypes.POST_ERROR,
//             payload: errors.map(error => error.msg)
//         });
//     }
// };