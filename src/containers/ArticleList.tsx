import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import fetchArticleList from '../actions/fetchArticleList';
import ArticleInList from '../components/ArticleInList';

interface Article {
  identifier: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: {
    identifier: string;
    name: string;
    photoURL: string;
  };
}
interface Props {
  articleList: [Article];
  fetchArticleList(): void;
}
class ArticleList extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchArticleList();
  }

  render() {
    return (
      <div className="container white">
        <h4 className="px-1 pt-3">投稿リスト</h4>
        <div className="w-100 px-0 py-3">
          { this.props.articleList.map(article => (
            <ArticleInList article={article} key={article.identifier} />
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const articleListStates = state.articleList;
  const latestState =
    articleListStates.length > 0 ? articleListStates[articleListStates.length - 1] : articleListStates;
  return {
    articleList: latestState.articleList,
    isFetching: state.isFetching,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArticleList: () => dispatch(fetchArticleList()),
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(ArticleList);
