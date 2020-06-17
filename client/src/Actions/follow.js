import axios from 'axios';
import * as actionTypes from './actionTypes';

// export const checkFollow = (id) => async dispatch => {
//     try {
//         //loading first
//         dispatch({ type: actionTypes.LOADING });

//         const response = await axios.get(`/users/checkFollow/${id}`);

//         dispatch({
//             type: actionTypes.CHECK_FOLLOW,
//             payload: response.data
//         });

//     } catch (err) {
//         const errors = err.response.data.errors;

//         dispatch({
//             type: actionTypes.PROFILE_ERROR,
//             payload: errors.map(error => error.msg)
//         });
//     }
// };

//--------------follow user by id---------------------
export const followUserById = id => async dispatch => {
    try {
        //loading first
        dispatch({ type: actionTypes.LOADING });

        const response = await axios.put(`/users/follow/${id}`);

        //send back data
        dispatch({
            type: actionTypes.FOLLOW_USER,
            payload: response.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        console.log(errors);

        // dispatch({
        //     type: actionTypes.PROFILE_ERROR,
        //     payload: errors.map(error => error.msg)
        // });
    }
};


//--------------follow user by id---------------------
export const unfollowUserById = id => async dispatch => {
    try {
        //loading first
        dispatch({ type: actionTypes.LOADING });

        const response = await axios.put(`/users/unfollow/${id}`);

        //send back data
        dispatch({
            type: actionTypes.UNFOLLOW_USER,
            payload: response.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        console.log(errors);

        // dispatch({
        //     type: actionTypes.PROFILE_ERROR,
        //     payload: errors.map(error => error.msg)
        // });
    }
};