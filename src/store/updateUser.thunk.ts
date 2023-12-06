import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, setData } from './pageData.slice';

const updateUserThunk = (
	name: string,
	email: string,
	description: string,
	image: File | undefined
) => {
	return (dispatch: Dispatch, getState: any) => {
		const { userId, token } = getState().session;
		dispatch(setLoading({}));
		fetch('https://socialsync-ngrp6xylzq-wl.a.run.app/api/users/' + userId, {
			method: 'PUT',
			headers: {
				Authorization: token,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				...getState().pageData.data,
				name,
				email,
				description,
			}),
		})
			.then(async (response) => {
				if (response.ok && !image) {
					dispatch(
						setData({ ...getState().pageData.data, name, email, description })
					);
				} else if (response.ok && !!image) {
					const formData = new FormData();
					formData.append('image', image);
					const imgResponse = await fetch(
						'https://socialsync-ngrp6xylzq-wl.a.run.app/api/users/picture/' +
							userId,
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
								...getState().pageData.data,
								name,
								email,
								description,
								picture_url: (await imgResponse.json()).url,
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

export default updateUserThunk;
