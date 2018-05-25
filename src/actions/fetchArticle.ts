import { Dispatch } from 'redux';

import axios from 'axios';

import { API_URL } from '../config';

export const FETCH_ARTICLE_REQUEST = 'FETCH_ARTICLE_REQUEST';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_FAILURE';

interface Article {
  title: string;
  conten: string;
  created_at: string;
  updated_at: string;
}
const fetchArticleRequest = () => ({
  type: FETCH_ARTICLE_REQUEST,
});
const fetchArticleSuccess = (article: Article) => ({
  article,
  type: FETCH_ARTICLE_SUCCESS,
});
const fetchArticleFailure = (error: string) => ({
  error,
  FETCH_ARTICLE_FAILURE,
});

const fetchArticle = (userIdentifier, identifier) => (dispatch: Dispatch) => {
  const FETCH_ARTICLE_URL = `${API_URL}/users/${userIdentifier}/articles/${identifier}`;
  dispatch(fetchArticleRequest());
  return axios.get(FETCH_ARTICLE_URL)
    .then(res =>
      dispatch(fetchArticleSuccess(res.data)),
    ).catch(error =>
      dispatch(fetchArticleFailure(error)),
    );
};

export default fetchArticle;
