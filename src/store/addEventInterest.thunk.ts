import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, setData } from './pageData.slice';

const addEventInterestThunk = (id: string) => {
	return (dispatch: Dispatch, getState: any) => {
		const { token, userId } = getState().session;
		fetch(
			`https://socialsync-ngrp6xylzq-wl.a.run.app/api/users/${userId}/interests/add`,
			{
				method: 'POST',
				headers: {
					Authorization: token,
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ event_id: id }),
			}
		)
			.then(async (response) => {
				if (response.ok) {
					dispatch(setData({ ...getState().pageData.data, interested: true }));
				} else {
					dispatch(setError((await response.json())?.message));
				}
			})
			.catch((error) => {
				dispatch(setError(error.message));
			});
	};
};

export default addEventInterestThunk;
