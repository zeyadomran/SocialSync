/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiOutlineChat, HiChat, HiOutlineHeart, HiHeart } from 'react-icons/hi';

const AppHeader = () => {
	const p = usePathname();
	const [pathname, setPathname] = useState('');
	useEffect(() => setPathname(p), [p]);

	return (
		<div className="flex w-full justify-between items-center">
			<div>
				<img
					src={
						pathname.split('/').length > 1 ? '../../logo.svg' : '../logo.svg'
					}
					alt="socialsync logo"
				/>
			</div>
			<div className="flex items-center justify-between gap-4">
				<Link href="/app/chat">
					{pathname === '/app/chat' ? (
						<HiChat className="w-8 h-8 text-blue hover:text-white" />
					) : (
						<HiOutlineChat className="w-8 h-8 hover:text-blue" />
					)}
				</Link>
				<Link href="/app/favorites">
					{pathname === '/app/favorites' ? (
						<HiHeart className="w-8 h-8 text-blue hover:text-white" />
					) : (
						<HiOutlineHeart className="w-8 h-8 hover:text-blue" />
					)}
				</Link>
			</div>
		</div>
	);
};

export default AppHeader;
