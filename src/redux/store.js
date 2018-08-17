/**
 * Created by huk on 2018/8/16.
 */

import { createStore, compose, applyMiddleware } from 'redux';
import combineReducers from './reducers';
import ApiClient from './middleware/apiClient';
import clientMiddleware from './middleware/clientMiddleware';
import thunk from "redux-thunk";

const client = new ApiClient();
const clientMiddle = clientMiddleware(client);

const finalCreateStore = compose(
    applyMiddleware(
        thunk,
        clientMiddle
    )
)(createStore);

export default (initialState) => {
    console.log("initialState", initialState)
    const store = finalCreateStore(combineReducers, initialState);
    console.log("finalCreateStore", store)
    return store
};


// import { createStore } from 'redux';
//
// import combineReducers from './reducers';
//
// const store = createStore(combineReducers);
//
// export default store;
