import { combineReducers, applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';
import session from './session';
import errors from './errors';
import projects from './project';
import tasks from './task';
import timeframe from './timeframeActions'

const rootReducer = combineReducers({
  session,
  projects,
  tasks,
  timeframe,
  errors
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
