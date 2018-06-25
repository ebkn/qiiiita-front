import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import ArticleForm from './ArticleForm';
import { RootState } from '../state';

interface OwnProps {
  match: {
    params: {
      username: string;
      identifier: string;
    };
  };
  history: {
    push(path: string): void;
  };
}
interface PathTypes {
  username: string;
  identifier: string;
}
type Props = OwnProps & RouteComponentProps<PathTypes> & ReturnType<typeof mapStateToProps>;

class ArticleEdit extends React.Component<Props> {
  public componentDidMount() {
    if (this.props.editingArticle.title === '') {
      this.props.history.push(this.articleUrl());
    }
  }

  public render() {
    return (
      <div className="container-fluid">
        <ArticleForm formType="update" />
      </div>
    );
  }

  private articleUrl(): string {
    const { username, identifier } = this.props.match.params;
    return `/${username}/${identifier}`;
  }
}

const mapStateToProps = (state: RootState) => ({
  editingArticle: state.editingArticle,
});
export default withRouter(connect(
  mapStateToProps,
)(ArticleEdit));
