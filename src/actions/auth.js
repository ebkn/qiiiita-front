import axios from 'axios';

import { API_URL } from '../config';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  user: {
    identifier: data.identifier,
    name: data.name,
    uid: data.uid,
    email: data.email,
    photoURL: data.photoURL,
  },
});
const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});
const logoutAction = () => ({
  type: LOGOUT,
});

export const login = user => (dispatch) => {
  const AUTH_URL = `${API_URL}/auth`;
  dispatch(loginRequest());
  return axios.post(AUTH_URL, { user })
    .then(res =>
      dispatch(loginSuccess(res.data)),
    ).catch(err =>
      dispatch(loginFailure(err)),
    )
};

export const logout = () => dispatch => (
  dispatch(logoutAction())
);

