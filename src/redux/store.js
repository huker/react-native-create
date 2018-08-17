/**
 * Created by huk on 2018/8/16.
 */

import { createStore } from 'redux';

import combineReducers from './reducers';

const store = createStore(combineReducers);

export default store;
