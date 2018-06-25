import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import ArticleInList from '../components/ArticleInList';

import { RootState } from '../state';
import { ArticleListState } from '../reducers/articleList';
import { articleListAsyncActions } from '../actions/articleList';

import { API_URLS } from '../config';

interface OwnProps {
  fetchArticleList(): void;
}
interface PathTypes {}
type Props = OwnProps & RouteComponentProps<PathTypes> &
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class ArticleList extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchArticleList();
  }

  public render() {
    const { articleList } = this.props.articleList;
    return (
      <div className="container white">
        <h4 className="px-1 pt-3">投稿リスト</h4>
        <div className="w-100 px-0 py-3">
          { articleList.map(article => (
            <ArticleInList article={article} key={article.identifier} />
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  articleList: state.articleList,
});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  fetchArticleList: () => {
    dispatch(articleListAsyncActions.startedFetch({}));
    axios.get(API_URLS.fetchArticleList())
      .then(res =>
        dispatch(articleListAsyncActions.doneFetch({
          params: {}, result: { articleList: res.data },
        })),
      ).catch(error =>
        dispatch(articleListAsyncActions.failedFetch({
          params: {}, error: { error },
        })),
      );
  },
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(ArticleList)) as typeof ArticleList;
