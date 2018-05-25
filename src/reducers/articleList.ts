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
      return (Object as any).assign({}, state, {
        isFechting: true,
      });
    case FETCH_ARTICLE_LIST_SUCCESS:
      return (Object as any).assign({}, state, {
        articleList: action.articleList,
        isFetching: false,
      });
    case FETCH_ARTICLE_LIST_FAILURE:
      return (Object as any).assign({}, state, {
        isFeching: false,
        error: action.error,
      });
    case ADD_ARTICLE:
      state.articleList.unshift(action.article);
      return (Object as any).assign({}, state, {
        isFetching: false,
        articleList: state.articleList,
      });
    default:
      return state;
  }
};

export default articleList;
