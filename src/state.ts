import { AuthState } from './reducers/auth';
import { UserState } from './reducers/user';
import { ArticleListState } from './reducers/articleList';
import { ArticleState } from './reducers/article';
import { EditingArticleState } from './reducers/editingArticle';
import { CommentListState } from './reducers/commentList';

export type RootState = {
  auth: AuthState;
  user: UserState;
  articleList: ArticleListState;
  article: ArticleState;
  editingArticle: EditingArticleState;
  commentList: CommentListState;
};
