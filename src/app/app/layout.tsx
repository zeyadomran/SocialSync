import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import AppHeader from '@/components/AppHeader';
import AppMenu from '@/components/AppMenu';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex flex-col justify-between items-center h-full p-12 md:p-24 lg:p-32 gap-16 text-white">
			<AppHeader />
			{children}
			<AppMenu />
		</main>
	);
}
