/* eslint-disable @next/next/no-img-element */
'use client';

import {
	HiOutlineCalendar,
	HiOutlineClock,
	HiOutlineCurrencyDollar,
	HiUsers,
} from 'react-icons/hi';
import Button from '../Button';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
	imageUrl: string | undefined;
	name: string;
	numOfParticipants: string;
	price: string;
	date: string;
	time: string;
	id: string;
}
const EventCard: React.FC<Props> = ({
	date,
	id,
	imageUrl,
	name,
	numOfParticipants,
	price,
	time,
}) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	return (
		<div className="w-96 h-64 bg-blue-dark p-4 flex rounded-md">
			<div className="flex flex-col h-56 justify-start w-1/2 gap-2">
				<div
					className={`w-40 h-40 rounded-md flex items-center justify-center bg-blue-dark ${
						!imageUrl && 'p-2'
					}`}
				>
					{!!imageUrl ? (
						<img
							src={imageUrl}
							alt="profile picture"
							className="object-cover w-40 h-40 rounded-md"
						/>
					) : (
						<HiOutlineCalendar className="w-full h-full object-cover" />
					)}
				</div>
				<p className="font-bold">{name}</p>
			</div>
			<div className="flex flex-col justify-between items-end h-56 w-1/2 gap-4">
				<div className="flex flex-wrap gap-1 h-full">
					<div className="p-1 h-8 bg-blue text-white rounded-md text-sm flex items-center gap-1">
						<HiUsers className="w-4 h-4" />
						<p>{numOfParticipants} people</p>
					</div>
					<div className="p-1 h-8 bg-blue text-white rounded-md text-sm flex items-center gap-1">
						<HiOutlineCurrencyDollar className="w-4 h-4" />
						<p>{price}</p>
					</div>
					<div className="p-1 h-8 bg-blue text-white rounded-md text-sm flex items-center gap-1">
						<HiOutlineCalendar className="w-4 h-4" />
						<p>{date}</p>
					</div>
					<div className="p-1 h-8 bg-blue text-white rounded-md text-sm flex items-center gap-1">
						<HiOutlineClock className="w-4 h-4" />
						<p>{time}</p>
					</div>
				</div>
				<div className="flex flex-col items-end justify-end h-full w-full gap-4">
					<Link
						href={
							'/app/event?eventId=' +
							id +
							'&navigatedFrom=' +
							pathname +
							'?' +
							searchParams.toString()
						}
					>
						<Button label="View Details" style="secondary" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
