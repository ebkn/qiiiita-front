import * as React from 'react';
import styledComponents from 'styled-components';

import { Comment } from '../actions/commentList';

interface Props {
  comment: Comment;
}

const CommentInList: React.SFC<Props> = ({ comment }) => (
  <div className="p-0 m-0">
    <div className="w-100">
      <StyledImg src={comment.user.photoURL} />
    </div>
    <StyledComment>
      {comment.content}
    </StyledComment>
  </div>
);
const StyledImg = styledComponents.img.attrs({
  className: 'd-block my-1',
})`
  width: 30px;
  height: 30px;
  border: 1px solid white;
  border-radius: 3px;
`;

const StyledComment = styledComponents.div.attrs({
  className: 'px-4 py-3 mb-4 white',
})`
  border: 1px solid #E0E0E0;
  border-radius: 5px;
`;

export default CommentInList;
