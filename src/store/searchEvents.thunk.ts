import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, setData } from './pageData.slice';

const searchEventsThunk = (searchText: string) => {
	return (dispatch: Dispatch, getState: any) => {
		const { token, userId } = getState().session;
		dispatch(setLoading({}));
		fetch(
			'https://socialsync-ngrp6xylzq-wl.a.run.app/api/search?query=' +
				searchText,
			{
				method: 'GET',
				headers: {
					Authorization: token,
				},
			}
		)
			.then(async (response) => {
				if (response.ok) {
					const events = await response.json();
					dispatch(
						setData({
							events: Object.keys(events)?.reduce(
								(acc: any, cur: any) => [...acc, { ...events[cur], id: cur }],
								[]
							),
						})
					);
				} else {
					dispatch(setError((await response.json())?.message));
				}
			})
			.catch((error) => {
				dispatch(setError(error.message));
			});
	};
};

export default searchEventsThunk;
