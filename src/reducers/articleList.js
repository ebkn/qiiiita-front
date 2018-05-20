import {
  FETCH_ARTICLE_LIST_REQUEST,
  FETCH_ARTICLE_LIST_SUCCESS,
  FETCH_ARTICLE_LIST_FAILURE,
} from '../actions/fetchArticleList';
import { ADD_ARTICLE } from '../actions/addArticle';

const initialState = {
  articleList: [],
  isFetching: false,
};

const articleList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_LIST_REQUEST:
      return Object.assign({}, state, {
        isFechting: true,
      });
    case FETCH_ARTICLE_LIST_SUCCESS:
      return Object.assign({}, state, {
        articleList: action.articleList,
        isFetching: false,
      });
    case FETCH_ARTICLE_LIST_FAILURE:
      return Object.assign({}, state, {
        isFeching: false,
        error: action.error,
      });
    case ADD_ARTICLE:
      return Object.assign({}, state, {
        isFetching: false,
        articleList: state.articleList.append(action.article),
      });
    default:
      return state;
  }
};

export default articleList;
