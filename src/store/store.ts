'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import thunk from 'redux-thunk';
import sessionReducer from './session.slice';
import pageDataReducer from './pageData.slice';
import createFilter from 'redux-persist-transform-filter';

const createNoopStorage = () => {
	return {
		getItem(_key: string) {
			return Promise.resolve(null);
		},
		setItem(_key: string, value: any) {
			return Promise.resolve(value);
		},
		removeItem(_key: string) {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window !== 'undefined'
		? createWebStorage('local')
		: createNoopStorage();

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['session'],
	transforms: [createFilter('session', ['parsedToken', 'token', 'userId'])],
};

const rootReducer = combineReducers({
	session: sessionReducer,
	pageData: pageDataReducer,
});

const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer),
	middleware: [thunk],
	devTools: true,
});

const setupStore = () => {
	let persistor = persistStore(store);
	return { store, persistor };
};

export default setupStore;
