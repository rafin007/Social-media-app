import axios from "axios";
import * as actionTypes from "./actionTypes";

//axios config
let config = null;

//-------------create post-----------------
export const createPost = (formData, history) => async (dispatch) => {
  try {
    config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    //loading first
    dispatch({ type: actionTypes.POST_LOADING });

    const response = await axios.post("/posts", formData, config);

    dispatch({
      type: actionTypes.CREATE_POST,
      payload: response.data,
    });

    //redirect to single post component
    history.replace(`/post/${response.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//-------------edit post-----------------
export const editPost = (post_id, formData, history) => async (dispatch) => {
  try {
    config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    //loading first
    dispatch({ type: actionTypes.POST_LOADING });

    const response = await axios.patch(`/posts/${post_id}`, formData, config);

    dispatch({
      type: actionTypes.EDIT_POST,
      payload: response.data,
    });

    //redirect to single post component
    history.replace(`/post/${response.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//-------------get post by id--------------------
export const getPostById = (post_id) => async (dispatch) => {
  //clear the post state
  dispatch({ type: actionTypes.CLEAR_POST });

  try {
    //then load
    dispatch({ type: actionTypes.POST_LOADING });

    const response = await axios.get(`/posts/${post_id}`);

    dispatch({
      type: actionTypes.GET_POST,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//-----------------clear post------------------------
export const clearPost = () => (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_POST });
};

//-----------------clear posts------------------------
export const clearPosts = () => (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_POSTS });
};

//-----------------get all posts of logged in user---------------
export const getAllPosts = () => async (dispatch) => {
  try {
    //loading first
    dispatch({ type: actionTypes.POST_LOADING });

    const response = await axios.get("/posts/me");

    dispatch({
      type: actionTypes.GET_USER_POSTS,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//-----------------get all posts of user by id---------------
export const getPostsByUserId = (user_id) => async (dispatch) => {
  try {
    //loading first
    dispatch({ type: actionTypes.POST_LOADING });

    const response = await axios.get(`/posts/users/${user_id}`);

    dispatch({
      type: actionTypes.GET_USER_POSTS,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//------------------delete post by id-------------------
export const deletePostById = (post_id) => async (dispatch) => {
  try {
    //loading first
    dispatch({ type: actionTypes.POST_LOADING });

    //delete
    const response = await axios.delete(`/posts/${post_id}`);

    dispatch({
      type: actionTypes.DELETE_POST,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//----------------------add like to post---------------------
export const addLike = (post_id) => async (dispatch) => {
  try {
    //loading first
    dispatch({ type: actionTypes.LIKE_LOADING });

    const response = await axios.put(`/posts/like/${post_id}`);

    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: { id: post_id, likes: response.data },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//----------------------remove like from post---------------------
export const removeLike = (post_id) => async (dispatch) => {
  try {
    //loading first
    dispatch({ type: actionTypes.LIKE_LOADING });

    const response = await axios.put(`/posts/unlike/${post_id}`);

    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: { id: post_id, likes: response.data },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//------------------post comment on post by id------------------
export const postCommentOnPostById = (post_id, { text }) => async (
  dispatch
) => {
  try {
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ text });

    //loading first
    dispatch({ type: actionTypes.LIKE_LOADING });

    const response = await axios.post(
      `/posts/comments/${post_id}`,
      body,
      config
    );

    dispatch({
      type: actionTypes.POST_COMMENT,
      payload: { id: post_id, comments: response.data },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//------------------edit comment on post by id------------------
export const editCommentOnPostById = (post_id, commnet_id, { text }) => async (
  dispatch
) => {
  try {
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ text });

    //loading first
    dispatch({ type: actionTypes.LIKE_LOADING });

    const response = await axios.patch(
      `/posts/comments/${post_id}/${commnet_id}`,
      body,
      config
    );

    dispatch({
      type: actionTypes.EDIT_COMMENT,
      payload: { id: post_id, comments: response.data },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//-----------------delete comment on post by id
export const deletePostCommentById = (post_id, comment_id) => async (
  dispatch
) => {
  try {
    //loading first
    dispatch({ type: actionTypes.LIKE_LOADING });

    await axios.delete(`/posts/comments/${post_id}/${comment_id}`);

    dispatch({
      type: actionTypes.DELETE_COMMENT,
      payload: { postId: post_id, commentId: comment_id },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: errors.map((error) => error.msg),
    });
  }
};

//------------------get feed posts--------------
export const getFeedPosts = () => async (dispatch) => {
  try {
    //clear posts
    dispatch(clearPosts());

    //loading
    dispatch({
      type: actionTypes.POST_LOADING,
    });

    const response = await axios.get("/posts");

    //send back data
    dispatch({
      type: actionTypes.GET_FEED,
      payload: response.data,
    });
  } catch (err) {
    console.error(err);
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
