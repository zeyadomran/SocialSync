import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'SocialSync',
	description: 'events redefined, socialsync unleashed',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${montserrat.className} w-screen h-screen overflow-hidden bg-black`}
			>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
