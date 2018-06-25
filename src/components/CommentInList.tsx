import * as React from 'react';

import { Comment } from '../actions/commentList';

interface Props {
  comment: Comment;
}

const CommentInList: React.SFC<Props> = ({ comment }) => (
  <div>
    {comment.content}
  </div>
);
export default CommentInList;
