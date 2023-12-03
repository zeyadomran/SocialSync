import { STATUS } from '@/types';
import { useState } from 'react';

const useRequest = (u: string, o: RequestInit) => {
	const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
	const [url, setURL] = useState<string>(u);
	const [options, setOptions] = useState<RequestInit>(o);
	const [response, setResponse] = useState<any>();

	const send = (body?: string, headers?: Record<string, string>) => {
		setStatus(STATUS.LOADING);
		fetch(url, {
			...options,
			headers: { ...options?.headers, ...(headers ?? {}) },
			body: body ?? options?.body,
		})
			.then(async (response) => {
				setStatus(STATUS.SUCCESS);
				setResponse({
					...response,
					body: response.headers.get('Content-type')?.includes('json')
						? await response.json()
						: await response.text(),
				});
			})
			.catch((error) => {
				setStatus(STATUS.ERROR);
				setResponse(error);
			});
	};

	return { status, response, send, setURL, setOptions };
};

export default useRequest;
