import { combineReducers } from 'redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import global from './global'
import chatbot from './chatbot'

const rootReducer = combineReducers({
  global,
  chatbot,
  routing: routerReducer
});

export default rootReducer;
