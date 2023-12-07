import { createSlice } from '@reduxjs/toolkit';

export interface PageDataState {
	data?: Record<string, any>;
	loading?: boolean;
	error?: string;
}

const initialState: PageDataState = {
	data: undefined,
	error: undefined,
	loading: false,
};

const padeDataSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setData: (state, action) => {
			return {
				...state,
				data: { ...action.payload },
				loading: false,
			};
		},
		setError: (state, action) => {
			const error = action.payload.error;
			return { ...state, error, loading: false };
		},
		setLoading: (state, action) => {
			return { ...state, loading: true, data: undefined, error: undefined };
		},
	},
});

export const { setData, setError, setLoading } = padeDataSlice.actions;

export default padeDataSlice.reducer;
