/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CgVinyl } from 'react-icons/cg';
import { HiOutlineSearchCircle, HiOutlineUserCircle } from 'react-icons/hi';

const AppMenu = () => {
	const pathname = usePathname();

	return (
		<div className="flex w-80 h-12 justify-between items-center bg-blue-dark rounded-md relative px-4">
			<div className="h-16 w-16 bg-blue-dark rounded-md absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
				<Link href="/app/home">
					<CgVinyl
						className={`w-12 h-12 ${
							pathname === '/app/home'
								? 'text-blue hover:text-white'
								: 'hover:text-blue'
						} cursor-pointer`}
					/>
				</Link>
			</div>
			<Link href="/app/search">
				<HiOutlineSearchCircle
					className={`w-7 h-7 . ${
						pathname === '/app/search'
							? 'text-blue hover:text-white'
							: 'hover:text-blue'
					} cursor-pointer`}
				/>
			</Link>
			<Link href="/app/profile">
				<HiOutlineUserCircle
					className={`w-7 h-7 ${
						pathname === '/app/profile'
							? 'text-blue hover:text-white'
							: 'hover:text-blue'
					} cursor-pointer`}
				/>
			</Link>
		</div>
	);
};

export default AppMenu;
