import axios from 'axios';

import { API_URL } from '../config';

export const FETCH_ARTICLE_REQUEST = 'FETCH_ARTICLE_REQUEST';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_FAILURE';

const fetchArticleRequest = () => ({
  type: FETCH_ARTICLE_REQUEST,
});
const fetchArticleSuccess = data => ({
  type: FETCH_ARTICLE_SUCCESS,
  article: data,
});
const fetchArticleFailure = error => ({
  type: FETCH_ARTICLE_FAILURE,
  error,
});

const fetchArticle = identifier => (dispatch) => {
  const FETCH_ARTICLE_URL = `${API_URL}/articles/${identifier}`;
  dispatch(fetchArticleRequest());
  return axios.get(FETCH_ARTICLE_URL)
    .then(res =>
      dispatch(fetchArticleSuccess(res.data)),
    ).catch(error =>
      dispatch(fetchArticleFailure(error)),
    )
};

export default fetchArticle;
