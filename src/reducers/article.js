import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
} from '../actions/fetchArticle';

const initialState = {
  article: {},
  isFetching: false,
};

const article = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_REQUEST:
      return Object.assign({}, state, {
        isFechting: true,
      });
    case FETCH_ARTICLE_SUCCESS:
      return Object.assign({}, state, {
        article: action.article,
        isFetching: false,
      });
    case FETCH_ARTICLE_FAILURE:
      return Object.assign({}, state, {
        isFeching: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default article;
