import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, setData } from './pageData.slice';

const createEventThunk = (
	name: string,
	type: string,
	date: string,
	time: string,
	location: string,
	price: string,
	numOfParticipants: string,
	targetAudience: string,
	description: string,
	image: File
) => {
	return (dispatch: Dispatch, getState: any) => {
		const { userId, token } = getState().session;
		dispatch(setLoading({}));
		fetch(
			'https://socialsync-ngrp6xylzq-wl.a.run.app/api/events/createEvent/' +
				userId,
			{
				method: 'POST',
				headers: {
					Authorization: token,
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					event_name: name,
					event_type: type,
					event_date: date,
					event_time: time,
					event_location: location,
					price: price,
					numOfParticipants: numOfParticipants,
					event_target_audience: targetAudience,
					event_details: description,
				}),
			}
		)
			.then(async (response) => {
				if (response.ok && !image) {
					dispatch(
						setData({
							event_name: name,
							type,
							date,
							time,
							location,
							price,
							numOfParticipants,
							target_audience: targetAudience,
							description,
						})
					);
				} else if (response.ok && !!image) {
					const formData = new FormData();
					formData.append('images', image);
					const imgResponse = await fetch(
						'https://socialsync-ngrp6xylzq-wl.a.run.app/api/event/picture/' +
							(
								await response.json()
							).eventID,
						{
							method: 'POST',
							headers: {
								Authorization: token,
							},
							body: formData,
						}
					);
					if (imgResponse.ok) {
						dispatch(
							setData({
								event_name: name,
								type,
								date,
								time,
								location,
								price,
								numOfParticipants,
								target_audience: targetAudience,
								description,
								images: [(await imgResponse.json()).url],
							})
						);
					}
				} else {
					dispatch(setError((await response.json())?.message));
				}
			})
			.catch((error) => {
				dispatch(setError(error.message));
			});
	};
};

export default createEventThunk;
