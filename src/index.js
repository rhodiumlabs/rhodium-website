import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { configureStore } from './store/configureStore';
import routes from './routes';
import './styles/index.scss';

import { RoutingContext, match } from 'react-router';


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('root')
);
