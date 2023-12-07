'use client';
import AppHeader from '@/components/AppHeader';
import AppMenu from '@/components/AppMenu';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { useSelector } from 'react-redux';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const { loading } = useSelector(({ pageData }) => pageData);
	const [isOnline, setNetwork] = useState(window.navigator.onLine);
	useEffect(() => {
		window.addEventListener('offline', () =>
			setNetwork(window.navigator.onLine)
		);
		window.addEventListener('online', () =>
			setNetwork(window.navigator.onLine)
		);
	});

	return (
		<main className="relative">
			{!isOnline && (
				<div className="absolute top-8 left-1/2 -translate-x-1/2 z-[999] bg-blue text-white p-4 rounded-md">
					WIFI disconnected!
				</div>
			)}
			{loading && isOnline && (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]">
					<CgSpinner className={`animate-spin text-blue w-32 h-32 z-[999]`} />
				</div>
			)}
			<div
				className={`flex flex-col justify-between items-center h-screen p-8 md:p-16 lg:p-24 gap-8 text-white overflow-hidden ${
					!isOnline && 'pointer-events-none blur-sm'
				}`}
			>
				<AppHeader />
				{children}
				<AppMenu />
			</div>
		</main>
	);
}
