import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, setData } from './pageData.slice';

const getEventDetailsThunk = (id: string) => {
	return (dispatch: Dispatch, getState: any) => {
		const { token, userId } = getState().session;
		dispatch(setLoading({}));
		fetch('https://socialsync-ngrp6xylzq-wl.a.run.app/api/events/' + id, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then(async (response) => {
				if (response.ok) {
					const interestedEvents = await fetch(
						`https://socialsync-ngrp6xylzq-wl.a.run.app/api/users/${userId}/events/interested`,
						{
							method: 'GET',
							headers: {
								Authorization: token,
							},
						}
					);
					dispatch(
						setData({
							...(await response.json()),
							interested:
								(await interestedEvents.json()).interested_events.length > 0,
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

export default getEventDetailsThunk;
