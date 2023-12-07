/* eslint-disable @next/next/no-img-element */
'use client';
import Button from '@/components/Button';
import EventCard from '@/components/EventCard';
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
		<div className="flex flex-col gap-4 items-start justify-start w-full h-full  overflow-y-scroll">
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
			<div className="w-full flex flex-col items-start justify-start gap-4">
				{data && (
					<div className="flex flex-col w-full gap-4">
						<p className="font-bold text-xl">Events created</p>
						{data.eventsCreated?.length > 0 ? (
							<div className="flex flex-wrap w-full items-center justify-start gap-4">
								{data.eventsCreated.map((event: any) => (
									<EventCard
										date={event.date}
										id={event.id}
										imageUrl={event.images?.[0]}
										name={event.event_name}
										numOfParticipants={event.numOfParticipants}
										price={event.price}
										time={event.time}
										key={event.id}
									/>
								))}
							</div>
						) : (
							<p>No events created.</p>
						)}
					</div>
				)}
				{data && (
					<div className="flex flex-col w-full gap-4">
						<p className="font-bold text-xl">Events interested</p>
						{data.eventsInterested?.length > 0 ? (
							<div className="flex flex-wrap w-full items-center justify-start gap-4">
								{data.eventsInterested.map((event: any) => (
									<EventCard
										date={event.date}
										id={event.id}
										imageUrl={event.images?.[0]}
										name={event.event_name}
										numOfParticipants={event.numOfParticipants}
										price={event.price}
										time={event.time}
										key={event.id}
									/>
								))}
							</div>
						) : (
							<p>No events interested.</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
