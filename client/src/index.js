import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { configureStore } from './store/configureStore';
import Root from './containers/Root';
import Contact from './containers/Contact';
import People from './containers/People';
import About from './containers/About';
import App from './containers/App';
import TypeWriter from 'react-typewriter';
import './styles/main.scss';





const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

const routes = {
  path: '/',
  component: Root,
  indexRoute: { component: App },
  childRoutes: [
    {path:'/contact', component: Contact},
    {path:'/people', component: People},
    {path:'/about', component: About}
  ]
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('root')
);
