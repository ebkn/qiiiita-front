import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Article, articleAsyncActions } from '../actions/article';

export interface ArticleState {
  isFetching: boolean;
  article: Article | null;
}

const initialState: ArticleState = {
  isFetching: false,
  article: null,
};

export const articleReducer = reducerWithInitialState(initialState)
  .case(articleAsyncActions.startedFetch, (state, {}) => {
    return (Object as any).assign({}, state, {
      isFetching: true,
    });
  })
  .case(articleAsyncActions.doneFetch, (state, payload) => {
    return (Object as any).assign({}, state, {
      article: payload.result.article,
      isFetching: false,
    });
  })
  .case(articleAsyncActions.failedFetch, (state, payload) => {
    return (Object as any).assign({}, state, {
      error: payload.error.error,
      isFeching: false,
    });
  });
