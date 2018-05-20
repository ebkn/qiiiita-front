import axios from 'axios';

import { API_URL } from '../config';

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

const fetchPostRequest = () => ({
  type: FETCH_POST_REQUEST,
});
const fetchPostSuccess = data => ({
  type: FETCH_POST_SUCCESS,
  post: data,
});
const fetchPostFailure = error => ({
  type: FETCH_POST_FAILURE,
  error,
});

const fetchPost = identifier => (dispatch) => {
  const FETCH_POST_URL = `${API_URL}/posts/${identifier}`;
  dispatch(fetchPostRequest());
  return axios.get(FETCH_POST_URL)
    .then(res =>
      dispatch(fetchPostSuccess(res.data)),
    ).catch(error =>
      dispatch(fetchPostFailure(error)),
    )
};

export default fetchPost;

