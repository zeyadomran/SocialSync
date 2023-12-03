/* eslint-disable @next/next/no-img-element */
'use client';
import useIsAuth from '@/hooks/useIsAuth';

export default function Home() {
	useIsAuth();

	return (
		<main className="flex flex-col justify-start items-center h-full p-16 md:p-24 lg:p-32 gap-16 text-white">
			home
		</main>
	);
}
