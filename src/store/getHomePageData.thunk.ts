import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, setData } from './pageData.slice';

const getHomePageDataThunk = () => {
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
					// const user = await response.json();
					// const eventsCreatedResponse = await fetch(
					// 	'https://socialsync-ngrp6xylzq-wl.a.run.app/api/events/eventIDs',
					// 	{
					// 		method: 'POST',
					// 		headers: {
					// 			Authorization: token,
					// 			'Content-type': 'application/json',
					// 		},
					// 		body: JSON.stringify({ eventIDList: [...user.events_created] }),
					// 	}
					// );
					// if (eventsCreatedResponse.ok) {
					setData({
						user: await response.json(),
						// eventsCreated: (await eventsCreatedResponse.json()).events ?? [],
					});
					// }
				}
			})
			.catch((error) => {
				setError(error);
			});
		// if (user) {
		// 	if (user.events_created) {
		// 		eventsCreated = await fetch(
		// 			'https://socialsync-ngrp6xylzq-wl.a.run.app/api/events/eventIDs',
		// 			{
		// 				method: 'POST',
		// 				headers: {
		// 					Authorization: token,
		// 					'Content-type': 'application/json',
		// 				},
		// 				body: JSON.stringify({ eventIDList: [...user.events_created] }),
		// 			}
		// 		).then((response) => response.json());
		// 	}
		// 	if (user.events_interested) {
		// 		eventsInterested = await fetch(
		// 			'https://socialsync-ngrp6xylzq-wl.a.run.app/api/events/eventIDs',
		// 			{
		// 				method: 'POST',
		// 				headers: {
		// 					Authorization: token,
		// 					'Content-type': 'application/json',
		// 				},
		// 				body: JSON.stringify({ eventIDList: [...user.events_interested] }),
		// 			}
		// 		).then((response) => response.json());
		// 	}
		// }
		// setData({
		// 	user,
		// 	eventsInterested: (await eventsInterested?.events) ?? [],
		// 	eventsCreated: (await eventsCreated?.events) ?? [],
		// });
	};
};

export default getHomePageDataThunk;
