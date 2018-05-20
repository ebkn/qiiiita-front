import { combineReducers } from 'redux';

import articleList from './articleList';
import article from './article';
import editingArticle from './editingArticle';

const rootReducer = combineReducers({
  articleList,
  article,
  editingArticle,
});

export default rootReducer;
