import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, setData } from './pageData.slice';

const userProfileThunk = () => {
	return (dispatch: Dispatch, getState: any) => {
		const { userId, token } = getState().session;
		dispatch(setLoading({}));
		fetch('https://socialsync-ngrp6xylzq-wl.a.run.app/api/users/' + userId, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then(async (response) => {
				if (response.ok) {
					dispatch(setData(await response.json()));
				} else {
					dispatch(setError((await response.json())?.message));
				}
			})
			.catch((error) => {
				dispatch(setError(error.message));
			});
	};
};

export default userProfileThunk;
