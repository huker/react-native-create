/**
 * Created by huk on 2018/8/16.
 */

import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers';
import ApiClient from './middleware/apiClient';
import clientMiddleware from './middleware/clientMiddleware';
import thunk from "redux-thunk";
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const client = new ApiClient();
const clientMiddle = clientMiddleware(client);

//集成数据持久化
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};
const persistReducer = persistCombineReducers(persistConfig, combineReducers);

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    clientMiddle
)(createStore);

const configuerStore = onComplete => {
    let store = createStoreWithMiddleware(persistReducer);
    let persistor = persistStore(store, null, onComplete);
    return { persistor, store };
};

export default configuerStore;