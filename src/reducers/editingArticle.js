import {
  EDIT_TITLE,
  EDIT_CONTENT,
} from '../actions/editArticle';

const initialState = {
  title: '',
  content: '',
};

const editingArticle = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_TITLE:
      return Object.assign({}, state, {
        title: action.title,
      });
    case EDIT_CONTENT:
      return Object.assign({}, state, {
        content: action.content,
      });
    default:
      return state;
  }
};

export default editingArticle;

