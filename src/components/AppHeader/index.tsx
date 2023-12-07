/* eslint-disable @next/next/no-img-element */
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
		</div>
	);
};

export default AppHeader;
