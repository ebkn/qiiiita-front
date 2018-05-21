import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'normalize.css';

import Header from '../components/Header';
import FooterBar from '../components/FooterBar';
import ArticleList from '../containers/ArticleList';
import Article from '../containers/Article';
import ArticlePost from '../components/ArticlePost';

const App = () => (
  <Router>
    <div className="w-100 px-0 grey lighten-4">
      <Header />
      <div className="py-4">
        <Switch>
          <Route exact path="/" component={ArticleList} />
          <Route path="/articles/new" component={ArticlePost} />
          <Route path="/articles/:identifier" component={Article} />
          <Route>
            <h2>Page Not Found</h2>
          </Route>
        </Switch>
      </div>
      <FooterBar />
    </div>
  </Router>
);

export default App;
