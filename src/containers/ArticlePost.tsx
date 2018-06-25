import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import ArticleForm from './ArticleForm';
import { RootState } from '../state';
import { editingArticleActions } from '../actions/editingArticle';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class ArticlePost extends React.Component<Props> {
  public componentDidMount(): void {
    this.props.clearEditingArticle();
  }

  public render() {
    return (
      <div className="container-fluid">
        <ArticleForm formType="create" />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  editingArticle: state.editingArticle,
});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  clearEditingArticle: () => dispatch(editingArticleActions.clearArticle()),
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(ArticlePost);
