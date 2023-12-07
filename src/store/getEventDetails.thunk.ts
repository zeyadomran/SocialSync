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
					const event = await response.json();
					const userImages = [];
					for (let i = 0; i < event.attendees.length; i++) {
						try {
							const imgurl = await fetch(
								`https://socialsync-ngrp6xylzq-wl.a.run.app/api/users/picture/${event.attendees[i]}`,
								{
									method: 'GET',
									headers: {
										Authorization: token,
									},
								}
							);
							userImages.push({
								id: event.attendees[i],
								imgurl: (await imgurl.json())?.url ?? '',
							});
						} catch {}
					}
					dispatch(
						setData({
							...event,
							interested:
								!!(await interestedEvents.json()).interested_events?.find(
									(e: any) => e.event_name === event.event_name
								) || !!event.attendees.find((u: string) => u === userId),
							userImages,
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
