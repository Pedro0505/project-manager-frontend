import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from '../combineReducer';
import reducer from '../reducer';

/* eslint-disable no-underscore-dangle */
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
/* eslint-enable */

export default store;
