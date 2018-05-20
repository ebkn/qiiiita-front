import axios from 'axios';

import { API_URL } from '../config';

export const FETCH_POST_LIST_REQUEST = 'FETCH_POST_LIST_REQUEST';
export const FETCH_POST_LIST_SUCCESS = 'FETCH_POST_LIST_SUCCESS';
export const FETCH_POST_LIST_FAILURE = 'FETCH_POST_LIST_FAILURE';

const fetchPostListRequest = () => ({
  type: FETCH_POST_LIST_REQUEST,
});
const fetchPostListSuccess = data => ({
  type: FETCH_POST_LIST_SUCCESS,
  posts: data,
});
const fetchPostListFailure = error => ({
  type: FETCH_POST_LIST_FAILURE,
  error,
});

const fetchPostList = () => (dispatch) => {
  const FETCH_POST_LIST_URL = `${API_URL}/posts`;
  dispatch(fetchPostListRequest());
  return axios.get(FETCH_POST_LIST_URL)
    .then(res =>
      dispatch(fetchPostListSuccess(res.data)),
    ).catch(error =>
      dispatch(fetchPostListFailure(error)),
    )
};

export default fetchPostList;

