import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/auth';

const initialState = {
  loggedIn: false,
  user: {
    identifier: '',
    name: '',
    uid: '',
    email: '',
    photoURL: '',
  },
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        user: {
          identifier: action.user.identifier,
          name: action.user.name,
          uid: action.user.uid,
          email: action.user.email,
          photoURL: action.user.photoURL,
        },
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        loggedIn: false,
        error: action.error,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
        user: {
          identifier: '',
          name: '',
          uid: '',
          email: '',
          photoURL: '',
        },
      });
    default:
      return state;
  }
};

export default auth;

