'use client';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import AppHeader from '@/components/AppHeader';
import AppMenu from '@/components/AppMenu';
import { useSelector } from 'react-redux';
import { CgSpinner } from 'react-icons/cg';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const { loading } = useSelector(({ pageData }) => pageData);
	return (
		<main className="flex flex-col justify-between items-center h-full p-8 md:p-16 lg:p-24 gap-8 text-white">
			{loading && (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<CgSpinner className={`animate-spin text-blue w-32 h-32`} />
				</div>
			)}
			<AppHeader />
			{children}
			<AppMenu />
		</main>
	);
}
