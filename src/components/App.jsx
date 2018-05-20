import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'normalize.css';

import ArticleList from '../containers/ArticleList';
import Article from '../containers/Article';
import ArticlePost from '../components/ArticlePost';

const App = () => (
  <Router>
    <div>
      <Link to="/">
        <h2>Qiiiita</h2>
      </Link>
      <Link to="/articles/new">投稿する</Link>
      {/*
      <Header />
      */}
      <Switch>
        <Route exact path="/" component={ArticleList} />
        <Route path="/articles/new" component={ArticlePost} />
        <Route path="/articles/:identifier" component={Article} />
        <Route>
          <h2>Page Not Found</h2>
        </Route>
      </Switch>
      {/*
      <FooterBar />
      */}
    </div>
  </Router>
);

export default App;
