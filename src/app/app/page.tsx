/* eslint-disable @next/next/no-img-element */
'use client';
import useIsAuth from '@/hooks/useIsAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
	useIsAuth();
	const router = useRouter();
	useEffect(() => {
		router.push('/app/home');
	}, [router]);
	return <div></div>;
}
