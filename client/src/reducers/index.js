import { combineReducers } from 'redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import global from './global'
 
const rootReducer = combineReducers({
  global,
  routing: routerReducer
});

export default rootReducer;
