import { Dispatch } from 'redux';
import axios from 'axios';

import { API_URL } from '../config';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

interface User {
  identifier: string;
  name: string;
  uid: string;
  email: string;
  photoURL: string;
}
const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
const loginSuccess = (user: User) => ({
  type: LOGIN_SUCCESS,
  user: {
    identifier: user.identifier,
    name: user.name,
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
  } as User,
});
const loginFailure = (error: string) => ({
  error,
  type: LOGIN_FAILURE,
});
const logoutAction = () => ({
  type: LOGOUT,
});

export const login = (user: User) => (dispatch: Dispatch) => {
  const AUTH_URL = `${API_URL}/auth`;
  dispatch(loginRequest());
  return axios.post(AUTH_URL, { user })
    .then(res =>
      dispatch(loginSuccess(res.data)),
    ).catch(err =>
      dispatch(loginFailure(err)),
    );
};

export const logout = () => (dispatch: Dispatch) => (
  dispatch(logoutAction())
);
