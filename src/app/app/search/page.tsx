/* eslint-disable @next/next/no-img-element */
'use client';
import Button from '@/components/Button';
import EventCard from '@/components/EventCard';
import InputField from '@/components/InputField';
import useIsAuth from '@/hooks/useIsAuth';
import getHomePageDataThunk from '@/store/getHomePageData.thunk';
import searchEventsThunk from '@/store/searchEvents.thunk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {
	useIsAuth();
	const [searchText, setSearchText] = useState<string>('');
	const [modified, setModified] = useState<boolean>(false);
	const router = useRouter();
	const dispatch = useDispatch();
	const params = useSearchParams();
	const { data, loading } = useSelector(({ pageData }) => pageData);
	useEffect(() => {
		dispatch(searchEventsThunk('') as any);
	}, [dispatch]);

	useEffect(() => {
		if (searchText === '' && !modified) {
			setSearchText(params.get('query') ?? '');
			setModified(true);
		}
	}, [params, searchText, modified]);

	return (
		<div className="flex flex-col gap-4 items-start justify-start w-full h-full overflow-y-scroll">
			<div className="w-full flex flex-col items-end justify-start gap-2">
				<InputField
					label="Search"
					name="Search"
					placeholder="search"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<Button
					label="Search"
					size="sm"
					style="ghost"
					loading={loading}
					disabled={loading}
					onClick={() => {
						dispatch(searchEventsThunk(searchText) as any);
						router.push('/app/search?query=' + searchText);
					}}
				/>
			</div>
			{data && (
				<div className="flex flex-col w-full gap-4 h-full">
					<p className="font-bold text-xl">Results</p>
					{data.events?.length > 0 ? (
						<div className="flex flex-wrap w-full items-center justify-start gap-4">
							{data.events.map((event: any) => (
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
						<p>No events found.</p>
					)}
				</div>
			)}
		</div>
	);
}
