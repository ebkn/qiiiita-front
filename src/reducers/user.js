import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../actions/fetchUser';

const initialState = {
  user: {},
  isFetching: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        isFetching: false,
      });
    case FETCH_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default user;
