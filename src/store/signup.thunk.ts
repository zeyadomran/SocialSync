import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, setToken } from './session.slice';

const signupThunk = (
	name: string,
	email: string,
	password: string,
	age: string
) => {
	return (dispatch: Dispatch, getState: any) => {
		dispatch(setLoading({}));
		fetch('https://socialsync-ngrp6xylzq-wl.a.run.app/api/signup', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ name, email, password, age }),
		})
			.then(async (response) => {
				if (response.ok) {
					const data = await response.json();
					dispatch(
						setToken({ userID: data.user.localId, token: data.user.idToken })
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

export default signupThunk;
