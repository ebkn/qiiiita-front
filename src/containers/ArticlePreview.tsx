import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactMarkdown from 'react-markdown';

const style = {
  box: {
    height: '70vh',
    border: '1px solid #E0E0E0',
  },
};
interface Props {
  title: string;
  content: string;
}
const ArticlePreview: React.StatelessComponent<Props> = props => (
  <div className="w-100 px-1 py-2 white" style={style.box}>
    <h2>{props.title}</h2>
    <ReactMarkdown source={props.content} />
  </div>
);

const mapStateToProps = state => ({
  title: state.editingArticle.title,
  content: state.editingArticle.content,
});
export default connect(
  mapStateToProps,
)(ArticlePreview);
