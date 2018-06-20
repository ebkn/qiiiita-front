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
  .case(editingArticleActions.updateTitle, (state, payload) => {
    return  (Object as any).assign({}, state, { title: payload.title });
  })
  .case(editingArticleActions.updateContent, (state, payload) => {
    return  (Object as any).assign({}, state, { content: payload.content });
  })
  .case(editingArticleActions.setArticle, (state, payload) => {
    return  (Object as any).assign({}, state, {
      title: payload.title,
      content: payload.content,
    });
  });
