import {
  FETCH_POST_LIST_REQUEST,
  FETCH_POST_LIST_SUCCESS,
  FETCH_POST_LIST_FAILURE,
} from '../actions/fetchPostList';

const initialState = {
  posts: [],
  isFetching: false,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_LIST_REQUEST:
      return Object.assign({}, state, {
        isFechting: true,
      });
    case FETCH_POST_LIST_SUCCESS:
      return Object.assign({}, state, {
        posts: action.posts,
        isFetching: false,
      });
    case FETCH_POST_LIST_FAILURE:
      return Object.assign({}, state, {
        isFeching: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default posts;
