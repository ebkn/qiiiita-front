import * as React from 'react';
import { connect } from 'react-redux';

import CommentInList from '../components/CommentInList';

import { RootState } from '../state';

type Props = ReturnType<typeof mapStateToProps>;

const CommentList: React.SFC<Props> = (props: Props) => {
  const { commentList } = props.commentList;
  return (
    <div>
      { commentList.map(comment => (
        <CommentInList comment={comment} key={comment.identifier} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  commentList: state.commentList,
});
export default connect(
  mapStateToProps,
)(CommentList);
