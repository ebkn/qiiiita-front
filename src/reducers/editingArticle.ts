import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { editingArticleActions } from '../actions/editingArticle';

export interface EditingArticleState {
  title: string;
  content: string;
}

const initialState: EditingArticleState = {
  title: '',
  content: '',
};

export const editingArticleReducer = reducerWithInitialState(initialState)
  .case(editingArticleActions.updateTitle, (state, title) => {
    return  (Object as any).assign({}, state, { title });
  })
  .case(editingArticleActions.updateContent, (state, content) => {
    return  (Object as any).assign({}, state, { content });
  })
  .case(editingArticleActions.setArticle, (state, { title, content }) => {
    return  (Object as any).assign({}, state, { title, content });
  });
