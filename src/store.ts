import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from './reducers/auth';
import { userReducer } from './reducers/user';
import { articleListReducer } from './reducers/articleList';
import { articleReducer } from './reducers/article';
import { editingArticleReducer } from './reducers/editingArticle';
import { commentListReducer } from './reducers/commentList';

import { RootState } from './state';

export const store = createStore(
  combineReducers<RootState>({
    auth: authReducer,
    user: userReducer,
    articleList: articleListReducer,
    article: articleReducer,
    editingArticle: editingArticleReducer,
    commentList: commentListReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk.default)),
);
