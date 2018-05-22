import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import articleList from './articleList';
import article from './article';
import editingArticle from './editingArticle';

const rootReducer = combineReducers({
  auth,
  user,
  articleList,
  article,
  editingArticle,
});

export default rootReducer;
