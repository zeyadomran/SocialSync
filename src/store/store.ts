'use client';

import { Action, configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session.slice';
import thunk, { ThunkAction } from 'redux-thunk';
import { SessionState } from 'http2';

const store = configureStore({
	reducer: {
		session: sessionReducer,
	},
	middleware: [thunk],
	devTools: true,
});

export default store;
