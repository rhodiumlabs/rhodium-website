import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { configureStore } from './store/configureStore';
import Root from './containers/Root';
import App from './containers/App';

import './styles/main.scss';





const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

const routes = {
  path: '/',
  component: Root,
  indexRoute: { component: App },
  childRoutes: []
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('root')
);
