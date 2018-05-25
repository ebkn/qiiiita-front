import {
  EDIT_TITLE,
  EDIT_CONTENT,
} from '../actions/editArticle';
import { SET_ARTICLE } from '../actions/setArticle';

const initialState = {
  title: '',
  content: '',
};

const editingArticle = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_TITLE:
      return (Object as any).assign({}, state, {
        title: action.title,
      });
    case EDIT_CONTENT:
      return (Object as any).assign({}, state, {
        content: action.content,
      });
    case SET_ARTICLE:
      return (Object as any).assign({}, state, {
        title: action.title,
        content: action.content,
      });
    default:
      return state;
  }
};

export default editingArticle;
