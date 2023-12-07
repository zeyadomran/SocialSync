import { Dispatch } from '@reduxjs/toolkit';
import { setData, setLoading } from './pageData.slice';

const getHomePageDataThunk = () => {
	return async (dispatch: Dispatch, getState: any) => {
		const { userId, token } = getState().session;
		dispatch(setLoading({}));
		let eventsCreated, eventsInterested;
		const user = await fetch(
			'https://socialsync-ngrp6xylzq-wl.a.run.app/api/users/' + userId,
			{
				method: 'GET',
				headers: {
					Authorization: token,
				},
			}
		).then((response) => response.json());
		if (user) {
			if (user.events_created) {
				eventsCreated = await fetch(
					'https://socialsync-ngrp6xylzq-wl.a.run.app/api/events/eventIDs',
					{
						method: 'POST',
						headers: {
							Authorization: token,
							'Content-type': 'application/json',
						},
						body: JSON.stringify({ eventIDList: [...user.events_created] }),
					}
				).then((response) => response.json());
			}
			if (user.events_interested) {
				eventsInterested = await fetch(
					'https://socialsync-ngrp6xylzq-wl.a.run.app/api/events/eventIDs',
					{
						method: 'POST',
						headers: {
							Authorization: token,
							'Content-type': 'application/json',
						},
						body: JSON.stringify({ eventIDList: [...user.events_interested] }),
					}
				).then((response) => response.json());
			}
		}
		dispatch(
			setData({
				user,
				eventsInterested: !!eventsInterested?.events
					? Object.keys(eventsInterested?.events)?.reduce(
							(acc: any, cur: any) => [
								...acc,
								{ ...eventsInterested!.events[cur], id: cur },
							],
							[]
					  )
					: [],
				eventsCreated: !!eventsCreated?.events
					? Object.keys(eventsCreated?.events)?.reduce(
							(acc: any, cur: any) => [
								...acc,
								{ ...eventsCreated!.events[cur], id: cur },
							],
							[]
					  )
					: [],
			})
		);
	};
};

export default getHomePageDataThunk;
