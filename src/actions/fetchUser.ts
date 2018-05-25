import { Dispatch } from 'redux';
import axios from 'axios';

import { API_URL } from '../config';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

interface User {
  identifier: string;
  name: string;
  email: string;
  photoURL: string;
}
const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});
const fetchUserSuccess = (user: User) => ({
  type: FETCH_USER_SUCCESS,
  user: {
    identifier: user.identifier,
    name: user.name,
    email: user.email,
    photoURL: user.photoURL,
  } as User,
});
const fetchUserFailure = (error: string) => ({
  error,
  type: FETCH_USER_FAILURE,
});

const fetchUser = identifier => (dispatch: Dispatch) => {
  const FETCH_USER_URL = `${API_URL}/users/${identifier}`;
  dispatch(fetchUserRequest());
  return axios.get(FETCH_USER_URL)
    .then(res =>
      dispatch(fetchUserSuccess(res.data)),
    ).catch(error =>
      dispatch(fetchUserFailure(error)),
    );
};

export default fetchUser;
