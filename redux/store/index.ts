import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore } from 'redux';
import reducer from '../reducer';

/* eslint-disable no-underscore-dangle */
const store = createStore(reducer, composeWithDevTools());
/* eslint-enable */

export default store;
