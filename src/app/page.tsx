import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex flex-col justify-start items-center h-full p-16 md:p-24 lg:p-32 gap-16 relative">
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

			<div className="z-10">
				<img src="./logo.svg" alt="socialsync logo" />
			</div>
			<div className="z-10">
				<img src="./hero.png" alt="hero" />
			</div>
			<div className="flex flex-col items-center gap-4 justify-between z-10">
				<Link
					href="/login"
					className="bg-blue p-2 text-white border-2 border-blue hover:border-blue-dark hover:bg-blue-dark cursor-pointer transition-all ease-in-out duration-200 rounded-md w-32 font-bold text-center"
				>
					Login
				</Link>
				<p className="text-grey">or</p>
				<Link
					href="/signup"
					className="bg-black p-2 text-white border-2 border-white hover:bg-white hover:text-black cursor-pointer transition-all ease-in-out duration-200 rounded-md w-32 font-bold text-center"
				>
					Signup
				</Link>
			</div>
		</main>
	);
}
