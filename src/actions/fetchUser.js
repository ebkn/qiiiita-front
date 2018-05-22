import axios from 'axios';

import { API_URL } from '../config';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});
const fetchUserSuccess = data => ({
  type: FETCH_USER_SUCCESS,
  user: {
    identifier: data.identifier,
    name: data.name,
    email: data.email,
    photoURL: data.photoURL,
  },
});
const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  error,
});

const fetchUser = identifier => (dispatch) => {
  const FETCH_USER_URL = `${API_URL}/users/${identifier}`;
  dispatch(fetchUserRequest());
  return axios.get(FETCH_USER_URL)
    .then(res =>
      dispatch(fetchUserSuccess(res.data)),
    ).catch(error =>
      dispatch(fetchUserFailure(error)),
    )
};

export default fetchUser;
