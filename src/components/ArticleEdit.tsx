import * as React from 'react';

import ArticleForm from '../containers/ArticleForm';

const ArticleEdit = () => (
  <div className="container fluid">
    <ArticleForm formType="update" />
  </div>
);

export default ArticleEdit;
