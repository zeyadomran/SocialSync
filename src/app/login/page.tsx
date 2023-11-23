import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex flex-col justify-start items-center h-full p-16 md:p-24 lg:p-32 gap-16 relative">
			<img
				src="./ball-large.svg"
				alt="large ball"
				className="absolute -top-32 -left-48"
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

			<div className="z-10">
				<img src="./logo.svg" alt="socialsync logo" />
			</div>

			<div className="flex flex-col items-center justify-between gap-8">
				<div className="z-10">
					<div className="w-64 h-14 bg-black border-b-2 border-b-white px-1">
						<input
							className="w-full h-full bg-inherit text-white outline-none"
							type="email"
							placeholder="Email"
						/>
					</div>
				</div>
				<div className="z-10 flex flex-col gap-1">
					<div className="w-64 h-14 bg-black border-b-2 border-b-white px-1">
						<input
							className="w-full h-full bg-inherit text-white outline-none"
							type="password"
							placeholder="Password"
						/>
					</div>
					<p className="text-grey self-end hover:text-white cursor-pointer">
						forgot password?
					</p>
				</div>
				<div className="flex flex-col items-center gap-4 justify-between z-10">
					<Link
						href="/login"
						className="bg-blue p-2 text-white border-2 border-blue hover:border-blue-dark hover:bg-blue-dark cursor-pointer transition-all ease-in-out duration-200 rounded-md w-32 font-bold text-center"
					>
						Login
					</Link>
					<Link
						href="../"
						className="text-grey hover:text-white cursor-pointer underline underline-offset-4"
					>
						Back
					</Link>
				</div>
			</div>
		</main>
	);
}
