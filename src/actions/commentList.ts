import { actionCreatorFactory } from 'typescript-fsa';

import { User } from './user';

const actionCreator = actionCreatorFactory();

export interface Comment {
  identifier: string;
  content: string;
  user: User;
}

export const commentListActions = {
  insertAll: actionCreator<{commentList: Comment[]}>('INSERT_ALL'),
  addComment: actionCreator<{comment: Comment}>('ADD_COMMENT'),
  updateComment: actionCreator<{identifier: string; content: string}>('UPDATE_COMMENT'),
  deleteComment: actionCreator<{comment: Comment}>('DELETE_COMMENT'),
};
