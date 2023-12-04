/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { CgSpinner } from 'react-icons/cg';

export default function Loading() {
	return (
		<main className="h-full w-full flex flex-col items-center justify-start relative p-16 md:p-24 lg:p-32 gap-16">
			<img
				src="./ball-large.svg"
				alt="large ball"
				className="absolute top-1/5 -left-48"
			/>
			<img
				src="./ball-medium.svg"
				alt="medium ball"
				className="absolute -top-8 left-3/4"
			/>
			<img
				src="./ball-medium.svg"
				alt="medium ball"
				className="absolute top-2/3 -right-8"
			/>
			<img
				src="./ball-small.svg"
				alt="small ball"
				className="absolute -bottom-4 right-2/3"
			/>
			<div className="z-10 mb-auto">
				<img src="./logo.svg" alt="socialsync logo" />
			</div>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<CgSpinner className={`animate-spin text-blue w-32 h-32`} />
			</div>
		</main>
	);
}
