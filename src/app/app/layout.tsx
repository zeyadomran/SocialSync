'use client';
import AppHeader from '@/components/AppHeader';
import AppMenu from '@/components/AppMenu';
import { CgSpinner } from 'react-icons/cg';
import { useSelector } from 'react-redux';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const { loading } = useSelector(({ pageData }) => pageData);
	return (
		<main className="flex flex-col justify-between items-center h-full p-8 md:p-16 lg:p-24 gap-8 text-white">
			{loading && (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]">
					<CgSpinner className={`animate-spin text-blue w-32 h-32 z-[999]`} />
				</div>
			)}
			<AppHeader />
			{children}
			<AppMenu />
		</main>
	);
}
