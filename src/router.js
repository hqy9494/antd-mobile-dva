import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Products from './routes/Products';
import Reflash from './routes/Reflash/Reflash';
import Tab from './routes/Tab/Tab';
import Form from './routes/Form/Form';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/Products" exact component={Products} />
        <Route path="/Reflash" exact component={Reflash} />
        <Route path="/Tab" exact component={Tab} />
        <Route path="/Form" exact component={Form} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
