/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgVinyl } from 'react-icons/cg';
import { HiOutlineSearchCircle, HiOutlineUserCircle } from 'react-icons/hi';

const AppMenu = () => {
	const p = usePathname();
	const [pathname, setPathname] = useState('');
	useEffect(() => setPathname(p), [p]);

	return (
		<div className="flex w-80 h-12 justify-between items-center bg-blue-dark rounded-md relative px-4">
			<div className="h-16 w-16 bg-blue-dark rounded-md absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
				<Link
					href="/app/home"
					className={`w-12 h-12 rounded-md flex items-center justify-center fill-current ${
						pathname === '/app/home'
							? 'bg-blue cursor-not-allowed'
							: 'hover:bg-blue cursor-pointer'
					}`}
				>
					<CgVinyl className={`w-12 h-12 text-white`} />
				</Link>
			</div>
			<Link
				href="/app/search"
				className={`w-8 h-8 rounded-md flex items-center justify-center fill-current ${
					pathname === '/app/search'
						? 'bg-blue cursor-not-allowed'
						: 'hover:bg-blue cursor-pointer'
				}`}
			>
				<HiOutlineSearchCircle className={`w-7 h-7 text-white`} />
			</Link>
			<Link
				href="/app/profile"
				className={`w-8 h-8 rounded-md flex items-center justify-center fill-current ${
					pathname === '/app/profile'
						? 'bg-blue cursor-not-allowed'
						: 'hover:bg-blue cursor-pointer'
				}`}
			>
				<HiOutlineUserCircle className={`w-7 h-7 text-white`} />
			</Link>
		</div>
	);
};

export default AppMenu;
