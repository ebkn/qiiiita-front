import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const editingArticleActions = {
  updateTitle: actionCreator<{title: string}>('UPDATE_TITLE'),
  updateContent: actionCreator<{content: string}>('UPDATE_CONTENT'),
  setArticle: actionCreator<{title: string; content: string}>('SET_ARTICLE'),
};
