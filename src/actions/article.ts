import { actionCreatorFactory, Success, Failure } from 'typescript-fsa';

import { User } from './user';
import { Comment } from './commentList';

export interface Article {
  identifier: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  comments_count: number;
  user: User;
  comments: Comment[];
}

const actionCreator = actionCreatorFactory();
const fetchArticle =
  actionCreator.async<{}, {article: Article}, {error: string}>('FETCH_ARTICLE');

export const articleAsyncActions = {
  startedFetch: fetchArticle.started,
  failedFetch: fetchArticle.failed,
  doneFetch: fetchArticle.done,
};
