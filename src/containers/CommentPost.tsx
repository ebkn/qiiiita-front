import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { RootState } from '../state';
import { Comment, commentListActions } from '../actions/commentList';

import { API_URLS } from '../config';

interface OwnProps {
  match: {
    params: {
      identifier: string;
    };
  };
}
interface PathTypes {
  identifier: string;
}
type Props = OwnProps & RouteComponentProps<PathTypes> &
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface State {
  content: string;
}

class CommentPost extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { content: '' };
  }

  public postComment(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const { identifier } = this.props.match.params;
    axios.post(API_URLS.createComment(identifier), this.parameters())
      .then((res) => {
        this.props.addComment(res.data);
        this.setState({ content: '' });
      }).catch(error =>
        alert(error),
      );
  }

  public updateContent(content: string): void {
    this.setState({ content });
  }

  public postable(): boolean {
    return this.state.content !== '';
  }

  public render() {
    return (
      <div className="container-fluid px-0 py-5">
        <div className="container-fluid px-0 d-flex justify-content-start white">
          <Avatar />
          <p className="px-1 black-text">コメントを投稿する</p>
        </div>
        <form onSubmit={e => this.postComment(e)} className="container-fluid m-0 p-0">
          <StyledTextarea
            value={this.state.content}
            onChange={e => this.updateContent(e.target.value)}
            placeholder="コメントを入力してください"
          />
          <div className="container-fluid d-flex justify-content-end">
            <SubmitButton type="submit" disabled={!this.postable()}>
              投稿
            </SubmitButton>
          </div>
        </form>
      </div>
    );
  }

  private parameters(): any {
    const { access_token } = this.props.auth.currentUser;
    return ({
      access_token,
      comment: {
        content: this.state.content,
      },
    });
  }
}

const Avatar = styled.div.attrs({
  className: 'mr-2',
})`
  width: 30px;
  height: 30px;
  border: 1px solid #E0E0E0;
  border-radius: 2px;
`;
const StyledTextarea = styled.textarea.attrs({
  className: 'w-100 m-0 p-2 white text-grey',
})`
  height: 100px;
  border: 1px solid #E0E0E0;
  border-radius: 2px;
`;
const SubmitButton = styled.button.attrs({
  className: 'px-3 py-1 light-green text-white',
})`
  border: 1px solid #E0E0E0;
  border-radius: 2px;
`;

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  addComment: (comment: Comment) => dispatch(commentListActions.addComment({ comment })),
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(CommentPost));
