import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import axios from 'axios';

import ArticleInList from '../components/ArticleInList';

import { RootState } from '../state';
import { ArticleListState } from '../reducers/articleList';
import { articleListAsyncActions } from '../actions/articleList';

import { API_URL } from '../config';

const FETCH_ARTICLE_LIST_URL = `${API_URL}/articles`;

interface OwnProps {
  fetchArticleList(): void;
}
type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

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
    axios.get(FETCH_ARTICLE_LIST_URL)
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
export default connect(
  mapStateToProps, mapDispatchToProps,
)(ArticleList);
