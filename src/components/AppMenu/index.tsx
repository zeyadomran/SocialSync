/* eslint-disable @next/next/no-img-element */
'use client';
import { usePathname } from 'next/navigation';
import { CgVinyl } from 'react-icons/cg';
import { HiOutlineSearchCircle, HiOutlineUserCircle } from 'react-icons/hi';

const AppMenu = () => {
	const pathname = usePathname();

	return (
		<div className="flex w-80 h-12 justify-between items-center bg-blue-dark rounded-md relative px-4">
			<div className="h-16 w-16 bg-blue-dark rounded-md absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
				<CgVinyl
					className={`w-12 h-12 ${
						pathname === '/app'
							? 'text-blue hover:text-white'
							: 'hover:text-blue'
					} cursor-pointer`}
				/>
			</div>
			<HiOutlineSearchCircle
				className={`w-7 h-7 . ${
					pathname === '/app/search'
						? 'text-blue hover:text-white'
						: 'hover:text-blue'
				} cursor-pointer`}
			/>
			<HiOutlineUserCircle
				className={`w-7 h-7 ${
					pathname === '/app/profile'
						? 'text-blue hover:text-white'
						: 'hover:text-blue'
				} cursor-pointer`}
			/>
		</div>
	);
};

export default AppMenu;
