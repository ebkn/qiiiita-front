import { Dispatch } from 'redux';

import axios from 'axios';

import { API_URL } from '../config';

export const FETCH_ARTICLE_LIST_REQUEST = 'FETCH_ARTICLE_LIST_REQUEST';
export const FETCH_ARTICLE_LIST_SUCCESS = 'FETCH_ARTICLE_LIST_SUCCESS';
export const FETCH_ARTICLE_LIST_FAILURE = 'FETCH_ARTICLE_LIST_FAILURE';

interface Article {
  title: string;
  conten: string;
  created_at: string;
  updated_at: string;
}
const fetchArticleListRequest = () => ({
  type: FETCH_ARTICLE_LIST_REQUEST,
});
const fetchArticleListSuccess = (articleList: [Article]) => ({
  articleList,
  type: FETCH_ARTICLE_LIST_SUCCESS,
});
const fetchArticleListFailure = (error: string) => ({
  error,
  type: FETCH_ARTICLE_LIST_FAILURE,
});

const fetchArticleList = () => (dispatch: Dispatch) => {
  const FETCH_ARTICLE_LIST_URL = `${API_URL}/articles`;
  dispatch(fetchArticleListRequest());
  return axios.get(FETCH_ARTICLE_LIST_URL)
    .then(res =>
      dispatch(fetchArticleListSuccess(res.data)),
    ).catch(error =>
      dispatch(fetchArticleListFailure(error)),
    );
};

export default fetchArticleList;
