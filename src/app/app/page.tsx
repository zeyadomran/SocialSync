/* eslint-disable @next/next/no-img-element */
'use client';
import AppHeader from '@/components/AppHeader';
import AppMenu from '@/components/AppMenu';
import useIsAuth from '@/hooks/useIsAuth';

export default function Home() {
	useIsAuth();

	return (
		<main className="flex flex-col justify-between items-center h-full p-12 md:p-24 lg:p-32 gap-16 text-white">
			<AppHeader />
			<AppMenu />
		</main>
	);
}
