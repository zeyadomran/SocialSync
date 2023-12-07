/* eslint-disable @next/next/no-img-element */
'use client';
import Button from '@/components/Button';
import useIsAuth from '@/hooks/useIsAuth';
import { setToken } from '@/store/session.slice';
import userProfileThunk from '@/store/userProfile.thunk';
import { reverse } from 'lodash';
import Link from 'next/link';
import { useEffect } from 'react';
import {
	HiOutlineCalendar,
	HiOutlineIdentification,
	HiOutlineUserCircle,
	HiStar,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {
	useIsAuth();
	const dispatch = useDispatch();
	const { data } = useSelector(({ pageData }) => pageData);

	const getAge = (dateString: string) => {
		var today = new Date();
		var birthDate = new Date(reverse(dateString.split('/')).join('/'));
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	useEffect(() => {
		dispatch(userProfileThunk() as any);
	}, [dispatch]);
	return (
		<div className="flex flex-col gap-4 items-start justify-start w-full h-full">
			<div className="w-full flex justify-end gap-4">
				{data && (
					<Button
						label="Logout"
						onClick={() => dispatch(setToken(null))}
						size="sm"
						style="danger"
					/>
				)}
				{data && (
					<Link href="/app/profile/edit">
						<Button label="Edit profile" size="sm" style="secondary" />
					</Link>
				)}
			</div>
			{data && (
				<div className="flex justify-between items-start w-full gap-4">
					<div
						className={`w-56 h-56 rounded-md flex items-center justify-center bg-blue-dark ${
							!data.picture_url || (data.picture_url === '' && 'p-4')
						}`}
					>
						{data.picture_url && data.picture_url !== '' ? (
							<img
								src={data.picture_url}
								alt="profile picture"
								className="object-cover w-56 h-56 rounded-md"
							/>
						) : (
							<HiOutlineUserCircle className="w-full h-full object-cover" />
						)}
					</div>
					<div className="w-1/2 flex flex-col items-start justify-start gap-2">
						<p className="font-bold text-xl">{data.name}</p>
						<div className="flex flex-wrap gap-1">
							<div className="p-1 bg-blue text-white rounded-md text-sm flex items-center gap-1">
								<HiOutlineIdentification className="w-4 h-4" />
								<p> {getAge(data.age)} years old</p>
							</div>
							<div className="p-1 bg-blue text-white rounded-md text-sm flex items-center gap-1">
								<HiStar className="w-4 h-4" />
								<p>
									{Math.round(
										(data.rating.reduce(
											(sum: number, cur: number) => (sum += cur),
											0
										) /
											data.rating.length) *
											100
									) / 100}{' '}
									/ 5
								</p>
							</div>
							<div className="p-1 bg-blue text-white rounded-md text-sm flex items-center gap-1">
								<HiOutlineCalendar className="w-4 h-4" />
								<p>
									{data.events_created?.filter((e: string) => e !== 'none')
										.length ?? 0}{' '}
									events created
								</p>
							</div>
						</div>
						<p className="text-grey font-medium text-sm">
							{data.description !== ''
								? data.description
								: 'No description provided'}
						</p>
					</div>
				</div>
			)}
			{data && (
				<div className="flex flex-col items-start justify-start w-full gap-4">
					<p className="text-white text-xl font-bold w-full">
						Activites completed
					</p>
					<p className="text-grey font-medium">No activities completed.</p>
				</div>
			)}
		</div>
	);
}
