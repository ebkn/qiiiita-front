import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { articleListAsyncActions } from '../actions/articleList';
import { Article } from '../actions/article';

export interface ArticleListState {
  isFetching: boolean;
  articleList: Article[];
}

const initialState: ArticleListState = {
  isFetching: false,
  articleList: [],
};

export const articleListReducer = reducerWithInitialState(initialState)
  .case(articleListAsyncActions.startedFetch, (state, {}) => {
    return (Object as any).assign({}, state, {
      isFetching: true,
    });
  })
  .case(articleListAsyncActions.doneFetch, (state, payload) => {
    return (Object as any).assign({}, state, {
      articleList: payload.result.articleList,
      isFetching: false,
    });
  })
  .case(articleListAsyncActions.failedFetch, (state, payload) => {
    return (Object as any).assign({}, state, {
      error: payload.error.error,
      isFetching: false,
    });
  })
  .case(articleListAsyncActions.addArticle, (state, data) => {
    state.articleList.unshift(data.article);
    return (Object as any).assign({}, state, {
      articleList: state.articleList,
      isFetching: false,
    });
  });
