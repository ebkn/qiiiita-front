import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import styledComponents from 'styled-components';

interface Props {
  title: string;
  content: string;
}

const ArticlePreview: React.StatelessComponent<Props> = ({ title, content }) => {
  return (
    <PreviewBox className="w-100 px-1 py-2 white">
      <h2>{title}</h2>
      <ReactMarkdown source={content} />
    </PreviewBox>
  );
};

const PreviewBox = styledComponents.div`
  height: '70vh';
  border: '1px solid #E0E0E0';
`;

export default ArticlePreview;
