import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
} from '../actions/fetchPost';

const initialState = {
  post: {},
  isFetching: false,
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      return Object.assign({}, state, {
        isFechting: true,
      });
    case FETCH_POST_SUCCESS:
      return Object.assign({}, state, {
        post: action.post,
        isFetching: false,
      });
    case FETCH_POST_FAILURE:
      return Object.assign({}, state, {
        isFeching: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default post;
