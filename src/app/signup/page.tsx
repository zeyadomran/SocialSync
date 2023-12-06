/* eslint-disable @next/next/no-img-element */
'use client';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import isValidToken from '@/components/helpers/isValidToken';
import signupThunk from '@/store/signup.thunk';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

export default function Home() {
	const dispatch = useDispatch();
	const { loading, error, parsedToken } = useSelector(({ session }) => session);
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		if (isValidToken(parsedToken)) {
			router.push('/app/profile');
		}
	}, [parsedToken, router, searchParams]);

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
				initialValues={{ email: '', password: '', name: '', age: '' }}
				validationSchema={Yup.object().shape({
					email: Yup.string().email('invalid email').required('required'),
					password: Yup.string()
						.min(6, 'password is too short')
						.required('required'),
					name: Yup.string().required('required'),
					age: Yup.string()
						.matches(
							/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/g,
							'date of birth must be in the format DD/MM/YYYY'
						)
						.required('required'),
				})}
				onSubmit={(values) => {
					dispatch(
						signupThunk(
							values.name,
							values.email,
							values.password,
							values.age
						) as any
					);
				}}
			>
				{(formik) => (
					<div className="flex flex-col items-center justify-between gap-10">
						<div className="z-10 flex flex-col items-center justify-between gap-4">
							<InputField
								name="name"
								label="Name"
								onChange={(e) => {
									if (!formik.touched.name) {
										formik.setTouched({ ...formik.touched, name: true });
									}
									formik.handleChange(e);
								}}
								value={formik.values.name}
								placeholder="name"
								error={
									!!formik.errors.name && formik.touched.name
										? formik.errors.name
										: ''
								}
							/>
							<InputField
								name="email"
								label="Email"
								type="email"
								onChange={(e) => {
									if (!formik.touched.email) {
										formik.setTouched({ ...formik.touched, email: true });
									}
									formik.handleChange(e);
								}}
								value={formik.values.email}
								placeholder="email@example.com"
								error={
									!!formik.errors.email && formik.touched.email
										? formik.errors.email
										: ''
								}
							/>
							<InputField
								name="password"
								label="Password"
								type="password"
								onChange={(e) => {
									if (!formik.touched.password) {
										formik.setTouched({ ...formik.touched, password: true });
									}
									formik.handleChange(e);
								}}
								value={formik.values.password}
								placeholder="password"
								error={
									!!formik.errors.password && formik.touched.password
										? formik.errors.password
										: ''
								}
							/>
							<InputField
								name="age"
								label="Date of birth"
								onChange={(e) => {
									if (!formik.touched.age) {
										formik.setTouched({ ...formik.touched, age: true });
									}
									formik.handleChange(e);
								}}
								value={formik.values.age}
								placeholder="DD/MM/YYYY"
								error={
									!!formik.errors.age && formik.touched.age
										? formik.errors.age
										: ''
								}
							/>
						</div>
						<div className="flex flex-col items-center gap-4 justify-between z-10">
							<Button
								label="Signup"
								onClick={() => formik.submitForm()}
								loading={loading}
								disabled={
									!!formik.errors.email ||
									!!formik.errors.password ||
									!!formik.errors.name
								}
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
