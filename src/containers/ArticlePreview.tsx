import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactMarkdown from 'react-markdown';
import styledComponents from 'styled-components';

import { RootState } from '../state';

type Props = ReturnType<typeof mapStateToProps>;

const ArticlePreview: React.SFC<Props> = (props: Props) => (
  <PreviewBox className="w-100 px-1 py-2 white">
    <h2>{props.title}</h2>
    <ReactMarkdown source={props.content} />
  </PreviewBox>
);

const PreviewBox = styledComponents.div`
  height: '70vh';
  border: '1px solid #E0E0E0';
`;

const mapStateToProps = (state: RootState) => ({
  title: state.editingArticle.title,
  content: state.editingArticle.content,
});
export default connect(
  mapStateToProps,
)(ArticlePreview);
