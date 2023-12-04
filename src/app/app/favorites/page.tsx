/* eslint-disable @next/next/no-img-element */
'use client';
import useIsAuth from '@/hooks/useIsAuth';

export default function Page() {
	useIsAuth();

	return <div></div>;
}
