import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import Reducer from './reducers';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    "key": 'root',
    storage,
    // "whitelist": [ 'general']
};

let store;

const persistedReducer = persistReducer(persistConfig, Reducer);

store = createStore(persistedReducer,
    compose(applyMiddleware(thunk))
);

let persist = persistStore(store);

export {store, persist};
