/* eslint-disable @next/next/no-img-element */
'use client';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import FileUpload from '@/components/FileUpload';
import InputField from '@/components/InputField';
import useIsAuth from '@/hooks/useIsAuth';
import createEventThunk from '@/store/createEvent.thunk';
import { Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineCalendar } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

export default function Page() {
	useIsAuth();
	const dispatch = useDispatch();
	const { data, loading, error } = useSelector(({ pageData }) => pageData);
	const [image, setImage] = useState<File | undefined>(undefined);

	return (
		<div className="flex flex-col gap-4 items-start justify-start w-full h-full overflow-y-scroll">
			<Formik
				initialValues={{
					name: '',
					type: '',
					date: '',
					time: '',
					location: '',
					price: '',
					numOfParticipants: '',
					targetAudience: '',
					description: '',
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required('required'),
					description: Yup.string().required('required'),
					type: Yup.string().required('required'),
					date: Yup.string()
						.matches(
							/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/g,
							'date must be in the format DD/MM/YYYY'
						)
						.required('required'),
					time: Yup.string()
						.matches(
							/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
							'time must be in the format HH:MM and 24 hour clock'
						)
						.required('required'),
					location: Yup.string().required('required'),
					price: Yup.string()
						.matches(
							/^\d+(\.\d{1,2})?$/,
							'price must be a number with 2 decimal places'
						)
						.required('required'),
					numOfParticipants: Yup.string()
						.matches(
							/^(0*\.0*[1-9]\d*|[1-9]\d*(\.\d+)?)$/,
							'number of participants must be greater than 0'
						)
						.required('required'),
					targetAudience: Yup.string().required('required'),
				})}
				onSubmit={(values) => {
					dispatch(
						createEventThunk(
							values.name,
							values.type,
							values.date,
							values.time,
							values.location,
							values.price,
							values.numOfParticipants,
							values.targetAudience,
							values.description,
							image!
						) as any
					);
				}}
			>
				{(formik) => (
					<>
						<div className="w-full flex justify-end gap-4">
							<Button
								label={'Create'}
								size="sm"
								loading={loading}
								disabled={
									(formik.errors.name && formik.touched.name) ||
									(formik.errors.type && formik.touched.type) ||
									(formik.errors.date && formik.touched.date) ||
									(formik.errors.time && formik.touched.time) ||
									(formik.errors.location && formik.touched.location) ||
									(formik.errors.price && formik.touched.price) ||
									(formik.errors.numOfParticipants &&
										formik.touched.numOfParticipants) ||
									(formik.errors.targetAudience &&
										formik.touched.targetAudience) ||
									(formik.errors.description && formik.touched.description) ||
									!image
								}
								onClick={() => formik.submitForm()}
							/>
							<Link href="../">
								<Button
									icon={<HiOutlineCalendar />}
									label="Go back"
									size="sm"
									style="secondary"
								/>
							</Link>
						</div>
						<div className="flex justify-between items-start w-full gap-4">
							<div
								className={`w-56 h-56 rounded-md flex items-center justify-center bg-blue-dark ${
									!image && 'p-4'
								}`}
							>
								{!!image ? (
									<img
										src={URL.createObjectURL(image)}
										alt="profile picture"
										className="object-cover w-56 h-56 rounded-md"
									/>
								) : (
									<HiOutlineCalendar className="w-full h-full object-cover" />
								)}
							</div>
							<div className="w-1/2 h-full flex flex-col items-center justify-center text-white">
								<FileUpload
									label={'Upload image'}
									required={true}
									filename={image?.name}
									onSubmit={(file: File | undefined) => {
										setImage(file);
									}}
								/>
							</div>
						</div>

						<div className="flex flex-col items-center justify-between w-full gap-4">
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
							<Dropdown
								label="Type"
								name="type"
								selected={formik.values.type}
								error={
									!!formik.errors.type && formik.touched.type
										? formik.errors.type
										: ''
								}
								items={[
									'Party',
									'Social',
									'Professional',
									'Casual',
									'Challenge',
									'Gaming',
								]}
								onSelected={(item: string) => {
									if (!formik.touched.type) {
										formik.setTouched({ ...formik.touched, type: true });
									}
									formik.setFieldValue('type', item);
								}}
							/>
							<InputField
								name="date"
								label="Date"
								onChange={(e) => {
									if (!formik.touched.date) {
										formik.setTouched({ ...formik.touched, date: true });
									}
									formik.handleChange(e);
								}}
								value={formik.values.date}
								placeholder="date"
								error={
									!!formik.errors.date && formik.touched.date
										? formik.errors.date
										: ''
								}
							/>
							<InputField
								name="time"
								label="Time"
								onChange={(e) => {
									if (!formik.touched.time) {
										formik.setTouched({ ...formik.touched, time: true });
									}
									formik.handleChange(e);
								}}
								value={formik.values.time}
								placeholder="time"
								error={
									!!formik.errors.time && formik.touched.time
										? formik.errors.time
										: ''
								}
							/>
							<InputField
								name="location"
								label="Location"
								onChange={(e) => {
									if (!formik.touched.location) {
										formik.setTouched({ ...formik.touched, location: true });
									}
									formik.handleChange(e);
								}}
								value={formik.values.location}
								placeholder="location"
								error={
									!!formik.errors.location && formik.touched.location
										? formik.errors.location
										: ''
								}
							/>
							<InputField
								name="price"
								label="Price"
								onChange={(e) => {
									if (!formik.touched.price) {
										formik.setTouched({ ...formik.touched, price: true });
									}
									formik.handleChange(e);
								}}
								value={formik.values.price}
								placeholder="price"
								error={
									!!formik.errors.price && formik.touched.price
										? formik.errors.price
										: ''
								}
							/>
							<InputField
								name="numOfParticipants"
								label="Number of participants"
								onChange={(e) => {
									if (!formik.touched.numOfParticipants) {
										formik.setTouched({
											...formik.touched,
											numOfParticipants: true,
										});
									}
									formik.handleChange(e);
								}}
								value={formik.values.numOfParticipants}
								placeholder="number of participants"
								error={
									!!formik.errors.numOfParticipants &&
									formik.touched.numOfParticipants
										? formik.errors.numOfParticipants
										: ''
								}
							/>
							<Dropdown
								label="Target Audience"
								name="targetAudience"
								selected={formik.values.targetAudience}
								error={
									!!formik.errors.targetAudience &&
									formik.touched.targetAudience
										? formik.errors.targetAudience
										: ''
								}
								items={['Child friendly', 'Adults only']}
								onSelected={(item: string) => {
									if (!formik.touched.targetAudience) {
										formik.setTouched({
											...formik.touched,
											targetAudience: true,
										});
									}
									formik.setFieldValue('targetAudience', item);
								}}
							/>
						</div>
					</>
				)}
			</Formik>
		</div>
	);
}
