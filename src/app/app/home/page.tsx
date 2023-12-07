/* eslint-disable @next/next/no-img-element */
'use client';
import Button from '@/components/Button';
import useIsAuth from '@/hooks/useIsAuth';
import getHomePageDataThunk from '@/store/getHomePageData.thunk';
import Link from 'next/link';
import { useEffect } from 'react';
import { HiOutlineCalendar } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {
	useIsAuth();
	const dispatch = useDispatch();
	const { data } = useSelector(({ pageData }) => pageData);
	useEffect(() => {
		dispatch(getHomePageDataThunk() as any);
	}, [dispatch]);
	return (
		<div className="flex flex-col gap-4 items-start justify-start w-full h-full">
			<div className="w-full flex justify-end gap-4">
				<Link href="/app/home/create">
					<Button
						icon={<HiOutlineCalendar />}
						label="Create"
						size="sm"
						style="primary"
					/>
				</Link>
			</div>
		</div>
	);
}
