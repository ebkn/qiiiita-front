import axios from 'axios';

import { API_URL } from '../config';

export const FETCH_ARTICLE_LIST_REQUEST = 'FETCH_ARTICLE_LIST_REQUEST';
export const FETCH_ARTICLE_LIST_SUCCESS = 'FETCH_ARTICLE_LIST_SUCCESS';
export const FETCH_ARTICLE_LIST_FAILURE = 'FETCH_ARTICLE_LIST_FAILURE';

const fetchArticleListRequest = () => ({
  type: FETCH_ARTICLE_LIST_REQUEST,
});
const fetchArticleListSuccess = data => ({
  type: FETCH_ARTICLE_LIST_SUCCESS,
  articleList: data,
});
const fetchArticleListFailure = error => ({
  type: FETCH_ARTICLE_LIST_FAILURE,
  error,
});

const fetchArticleList = () => (dispatch) => {
  const FETCH_ARTICLE_LIST_URL = `${API_URL}/articles`;
  dispatch(fetchArticleListRequest());
  return axios.get(FETCH_ARTICLE_LIST_URL)
    .then(res =>
      dispatch(fetchArticleListSuccess(res.data)),
    ).catch(error =>
      dispatch(fetchArticleListFailure(error)),
    )
};

export default fetchArticleList;
