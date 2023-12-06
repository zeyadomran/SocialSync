import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export interface SessionState {
	token?: string;
	parsedToken?: any;
	userId?: string;
	error?: string;
	loading?: boolean;
}

const initialState: SessionState = {
	token: undefined,
	parsedToken: undefined,
	userId: undefined,
	error: undefined,
	loading: false,
};

const sessionSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken: (state, action) => {
			if (!action.payload) {
				return initialState;
			}
			const token = action.payload.token;
			const userId = action.payload.userID;
			return {
				...state,
				token,
				userId,
				parsedToken: jwtDecode(token),
				loading: false,
			};
		},
		setError: (state, action) => {
			const error = action.payload.error;
			return { ...state, error, loading: false };
		},
		setLoading: (state, action) => {
			return { ...state, loading: true };
		},
	},
});

export const { setToken, setError, setLoading } = sessionSlice.actions;

export default sessionSlice.reducer;
