import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Comment, commentListActions } from '../actions/commentList';

export interface CommentListState {
  commentList: Comment[];
}

const initialState: CommentListState = {
  commentList: [],
};

export const commentListReducer = reducerWithInitialState(initialState)
  .case(commentListActions.insertAll, (state, payload) => {
    return (Object as any).assign({}, state, {
      commentList: payload.commentList,
    });
  })
  .case(commentListActions.addComment, (state, payload) => {
    state.commentList.push(payload.comment);
    return (Object as any).assign({}, state, {
      commentList: state.commentList,
    });
  })
  .case(commentListActions.updateComment, (state, payload) => {
    state.commentList.map((comment) => {
      if (comment.identifier === payload.identifier) {
        comment.content = payload.identifier;
      }
    });
    return (Object as any).assign({}, state, {
      commentList: state.commentList,
    });
  })
  .case(commentListActions.deleteComment, (state, payload) => {
    state.commentList.unshift(payload.comment);
    return (Object as any).assign({}, state, {
      commentList: state.commentList,
    });
  });
