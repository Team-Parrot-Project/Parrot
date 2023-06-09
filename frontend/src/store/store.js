import { combineReducers, applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';
import session from './session';
import errors from './errors';
import projects from './project';
import tasks from './task';
import notifications from './notification'
import timeframe from './timeframeActions'
import userReducer from './user';

const rootReducer = combineReducers({
  session,
  projects,
  tasks,
  notifications,
  timeframe,
  errors,
  users: userReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
