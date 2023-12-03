/* eslint-disable @next/next/no-img-element */
'use client';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import loginThunk from '@/store/login.thunk';
import { Formik } from 'formik';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

export default function Home() {
	const dispatch = useDispatch();
	const { loading, error, userId } = useSelector(({ session }) => session);
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		if (userId) {
			router.push(searchParams.get('navigatedFrom') ?? '/app');
		}
	}, [userId, router, searchParams]);

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

			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={Yup.object().shape({
					email: Yup.string().email('Invalid email').required('required'),
					password: Yup.string()
						.min(6, 'Password is too short')
						.required('required'),
				})}
				onSubmit={(values) => {
					dispatch(loginThunk(values.email, values.password) as any);
				}}
			>
				{(formik) => (
					<div className="flex flex-col items-center justify-between gap-8">
						<div className="z-10 flex flex-col items-center justify-between gap-4">
							<p className="text-red font-bold">{error}</p>
							<InputField
								name="email"
								label="Email"
								type="email"
								onChange={formik.handleChange}
								value={formik.values.email}
								placeholder="-"
								error={formik.errors.email}
							/>
							<InputField
								name="password"
								label="Password"
								type="password"
								onChange={formik.handleChange}
								value={formik.values.password}
								placeholder="-"
								error={formik.errors.password}
							/>
						</div>
						<div className="flex flex-col items-center gap-4 justify-between z-10">
							<Button
								label="Login"
								onClick={() => formik.submitForm()}
								loading={loading}
								disabled={!!formik.errors.email || !!formik.errors.password}
							/>
							<Link
								href="../"
								className="text-grey hover:text-white cursor-pointer underline underline-offset-4"
							>
								Back
							</Link>
						</div>
					</div>
				)}
			</Formik>
		</main>
	);
}