/* eslint-disable @next/next/no-img-element */
'use client';
import Button from '@/components/Button';
import useIsAuth from '@/hooks/useIsAuth';
import addEventInterestThunk from '@/store/addEventInterest.thunk';
import getEventDetailsThunk from '@/store/getEventDetails.thunk';
import { setData } from '@/store/pageData.slice';
import removeEventInterestThunk from '@/store/removeEventInterest.thunk';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
	HiLocationMarker,
	HiOutlineCalendar,
	HiOutlineClock,
	HiOutlineCurrencyDollar,
	HiOutlineLightningBolt,
	HiOutlineUserCircle,
	HiOutlineUserGroup,
	HiUsers,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {
	useIsAuth();
	const dispatch = useDispatch();
	const params = useSearchParams();
	const { data } = useSelector(({ pageData }) => pageData);
	useEffect(() => {
		dispatch(setData(undefined));
		dispatch(getEventDetailsThunk(params.get('eventId') ?? '') as any);
	}, [dispatch, params]);
	return (
		<div className="flex flex-col gap-8 items-start justify-start w-full h-full">
			<div className="w-full flex justify-end gap-2">
				<Link href={params.get('navigatedFrom') ?? '/app/home'}>
					<Button label="Go back" size="sm" style="secondary" />
				</Link>
			</div>
			{data && (
				<div className="flex justify-between items-start w-full gap-4">
					<div
						className={`w-56 h-56 rounded-md flex items-center justify-center bg-blue-dark ${
							!data.images || (data.images[0] === '' && 'p-4')
						}`}
					>
						{data.images && data.images[0] !== '' ? (
							<img
								src={data.images[0]}
								alt="event picture"
								className="object-cover w-56 h-56 rounded-md"
							/>
						) : (
							<HiOutlineCalendar className="w-full h-full object-cover" />
						)}
					</div>
					<div className="w-1/2 flex flex-col items-start justify-start gap-2">
						<p className="font-bold text-xl">{data.event_name}</p>

						<p className="text-grey font-medium text-sm">
							{data.description !== ''
								? data.description
								: 'No description provided'}
						</p>
					</div>
				</div>
			)}
			{data && (
				<div>
					{' '}
					<div className="flex flex-wrap gap-1">
						<div className="p-1 h-8 bg-blue text-white rounded-md text-sm flex items-center gap-1">
							<HiUsers className="w-4 h-4" />
							<p>{data.numOfParticipants} people</p>
						</div>
						<div className="p-1 h-8 bg-blue text-white rounded-md text-sm flex items-center gap-1">
							<HiOutlineCurrencyDollar className="w-4 h-4" />
							<p>{data.price}</p>
						</div>
						<div className="p-1 h-8 bg-blue text-white rounded-md text-sm flex items-center gap-1">
							<HiOutlineCalendar className="w-4 h-4" />
							<p>{data.date}</p>
						</div>
						<div className="p-1 h-8 bg-blue text-white rounded-md text-sm flex items-center gap-1">
							<HiOutlineClock className="w-4 h-4" />
							<p>{data.time}</p>
						</div>
						<div className="p-1 h-8 bg-blue text-white rounded-md text-sm flex items-center gap-1">
							<HiLocationMarker className="w-4 h-4" />
							<p>{data.location}</p>
						</div>
						<kbd></kbd>
						<div className="p-1 h-8 bg-blue text-whitek rounded-md text-sm flex items-center gap-1">
							<HiOutlineUserGroup className="w-4 h-4" />
							<p>{data.target_audience}</p>
						</div>
						<div className="p-1 h-8 bg-blue text-white rounded-md text-sm flex items-center gap-1">
							<HiOutlineLightningBolt className="w-4 h-4" />

							<p>{data.type}</p>
						</div>
					</div>
				</div>
			)}
			{data && (
				<div className={`w-full flex justify-end items-center`}>
					{data.interested ? (
						<Button
							label="Not interested"
							size="lg"
							style="danger"
							onClick={() =>
								dispatch(
									removeEventInterestThunk(params.get('eventId') ?? '') as any
								)
							}
						/>
					) : (
						<Button
							label="Interested"
							size="lg"
							onClick={() =>
								dispatch(
									addEventInterestThunk(params.get('eventId') ?? '') as any
								)
							}
						/>
					)}
				</div>
			)}
			{data && (
				<div className="w-full flex flex-col gap-4">
					<p className="font-bold text-xl">{data.attendees?.length} Enrolled</p>
					<div className="flex items-center justify-start gap-2">
						{data.userImages?.map(({ id, imgurl }: any, index: number) => (
							<div
								key={index}
								className={`w-12 h-12 rounded-md flex items-center justify-center bg-blue-dark ${
									(!imgurl || imgurl === '') && 'p-1'
								}`}
							>
								{imgurl && imgurl !== '' ? (
									<img
										src={imgurl}
										alt="profile picture"
										className="object-cover w-12 h-12 rounded-md"
									/>
								) : (
									<HiOutlineUserCircle className="w-full h-full object-cover" />
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
