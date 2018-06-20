import { actionCreatorFactory, Success, Failure } from 'typescript-fsa';

import { Article } from '../actions/article';

const actionCreator = actionCreatorFactory();
const fetchArticleList =
  actionCreator.async<{}, {articleList: Article[]}, {error: string}>('FETCH_ARTICLE_LIST');

export const articleListAsyncActions = {
  startedFetch: fetchArticleList.started,
  failedFetch: fetchArticleList.failed,
  doneFetch: fetchArticleList.done,
  addArticle: actionCreator<{article: Article}>('ADD_ARTICLE'),
};
