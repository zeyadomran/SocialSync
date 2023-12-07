/* eslint-disable @next/next/no-img-element */
'use client';
import Button from '@/components/Button';
import FileUpload from '@/components/FileUpload';
import InputField from '@/components/InputField';
import useIsAuth from '@/hooks/useIsAuth';
import updateUserThunk from '@/store/updateUser.thunk';
import userProfileThunk from '@/store/userProfile.thunk';
import { Formik } from 'formik';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

export default function Page() {
	useIsAuth();
	const dispatch = useDispatch();
	const { data, loading } = useSelector(({ pageData }) => pageData);
	const [newImage, setNewImage] = useState<File | undefined>(undefined);

	useEffect(() => {
		dispatch(userProfileThunk() as any);
	}, [dispatch]);

	return (
		<div className="flex flex-col gap-4 items-start justify-start w-full h-full">
			{data && (
				<Formik
					initialValues={{
						email: data.email,
						name: data.name,
						description: data.description,
					}}
					validationSchema={Yup.object().shape({
						email: Yup.string().email('invalid email').required('required'),

						name: Yup.string().required('required'),
						description: Yup.string(),
					})}
					onSubmit={(values, helpers) => {
						dispatch(
							updateUserThunk(
								values.name,
								values.email,
								values.description,
								newImage
							) as any
						);
						helpers.setTouched({
							email: false,
							description: false,
							name: false,
						});
						setNewImage(undefined);
					}}
				>
					{(formik) => (
						<>
							<div className="w-full flex justify-end gap-2">
								{((!formik.errors.name && formik.touched.name) ||
									(!formik.errors.email && formik.touched.email) ||
									(!formik.errors.description && formik.touched.description) ||
									!!newImage) && (
									<Button
										label="Save"
										size="sm"
										loading={loading}
										disabled={loading}
										onClick={() => formik.submitForm()}
									/>
								)}
								<Link href="/app/profile">
									<Button label="Go back" size="sm" style="secondary" />
								</Link>
							</div>

							<div className="flex justify-between items-start w-full gap-4">
								<div
									className={`w-56 h-56 rounded-md flex items-center justify-center bg-blue-dark ${
										(!data.picture_url || data.picture_url === '') &&
										!newImage &&
										'p-4'
									}`}
								>
									{(data.picture_url && data.picture_url !== '') ||
									!!newImage ? (
										<img
											src={
												!!newImage
													? URL.createObjectURL(newImage)
													: data.picture_url
											}
											alt="profile picture"
											className="object-cover w-56 h-56 rounded-md"
										/>
									) : (
										<HiOutlineUserCircle className="w-full h-full object-cover" />
									)}
								</div>
								<div className="w-1/2 h-full flex flex-col items-center justify-center text-white">
									<FileUpload
										label={
											!data.picture_url || data.picture_url === ''
												? 'Upload image'
												: 'Update image'
										}
										filename={newImage?.name}
										onSubmit={(file: File | undefined) => {
											setNewImage(file);
										}}
									/>
								</div>
							</div>
							<div className="flex flex-col items-center justify-between gap-10 w-full">
								<div className="flex flex-col items-center justify-between gap-4 w-full">
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
												? (formik.errors.name as string)
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
												? (formik.errors.email as string)
												: ''
										}
									/>
									<InputField
										name="description"
										label="Description"
										type="textarea"
										onChange={(e) => {
											if (!formik.touched.description) {
												formik.setTouched({
													...formik.touched,
													description: true,
												});
											}
											formik.handleChange(e);
										}}
										value={formik.values.description}
										placeholder="description"
										error={
											!!formik.errors.description && formik.touched.description
												? (formik.errors.description as string)
												: ''
										}
									/>
								</div>
							</div>
						</>
					)}
				</Formik>
			)}
		</div>
	);
}
