import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const nextReducers = require('../reducers');

const ENV = process.env.NODE_ENV;

const configureStore = (initialState = {}) => {
  const logger = createLogger();
  let enhancer;
  if (ENV === 'production') {
    enhancer = compose(applyMiddleware(thunk, promise));
  } else {
    enhancer = compose(applyMiddleware(thunk, promise, logger));
  }

  const store = createStore(reducers, initialState, enhancer);

  if (ENV !== 'production' && module.hot.active) {
    module.hot.accept('../reducers', () => {
      console.log('nextReducers', nextReducers);
      store.replaceReducer(nextReducers);
    });
  }
  return store;
};

export default configureStore;
