import * as actionTypes from '../Actions/actionTypes';

const initalState = {
    posts: [],
    post: null,
    errors: [],
    loading: false,
    likeLoading: false
};

const postReducer = (state = initalState, action) => {
    const { type, payload } = action;

    switch (type) {

        case actionTypes.POST_LOADING:
            return {
                ...state,
                loading: true
            }

        case actionTypes.CREATE_POST:
        case actionTypes.EDIT_POST:
        case actionTypes.GET_POST:
            return {
                ...state,
                loading: false,
                post: payload
            }

        case actionTypes.POST_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }

        case actionTypes.CLEAR_POST:
            return {
                ...state,
                post: null
            }

        case actionTypes.GET_USER_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload
            }

        case actionTypes.DELETE_POST:
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== payload._id)
            }

        case actionTypes.UPDATE_LIKES:
            return {
                ...state,
                likeLoading: false,
                posts: state.posts && state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post),
                post: state.post && { ...state.post, likes: payload.likes }
            }

        case actionTypes.LIKE_LOADING:
            return {
                ...state,
                likeLoading: true
            }

        case actionTypes.POST_COMMENT:
            return {
                ...state,
                likeLoading: false,
                posts: state.posts && state.posts.map(post => post._id === payload.id ? { ...post, comments: payload.comments } : post),
                post: state.post && { ...state.post, comments: payload.comments }
            }

        case actionTypes.DELETE_COMMENT:
            return {
                ...state,
                likeLoading: false,
                posts: state.posts && state.posts.map(post => post._id === payload.postId ? { ...post, comments: post.comments.filter(comment => comment._id !== payload.commentId) } : post),
                post: null
            }

        default:
            return state;
    }
}

export default postReducer;