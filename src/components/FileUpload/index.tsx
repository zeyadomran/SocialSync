import React, { useRef, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import Button from '../Button';

interface Props {
	label: string;
	onSubmit?: (file: File | undefined) => void;
	filename?: string;
	required?: boolean;
}
const FileUpload: React.FC<Props> = ({
	label,
	onSubmit,
	filename,
	required,
}) => {
	const ref = useRef<HTMLInputElement>(null);

	return (
		<div className="flex flex-col items-start justify-center gap-2">
			<input
				type="file"
				className="hidden"
				ref={ref}
				onChange={(e) => {
					onSubmit?.(e.target.files?.[0]);
				}}
				accept="image/png, image/jpeg, image/jpg"
			/>
			<div className="flex items-center justify-between w-32 gap-1 ">
				<p
					className={`${
						required && !filename ? 'text-red' : 'text-white'
					} text-sm text-ellipsis overflow-hidden whitespace-nowrap`}
					title={filename ?? 'No image selected'}
				>
					{filename ?? 'No image selected'}
				</p>
				{filename && (
					<HiOutlineX
						className="text-red w-6 h-6 cursor-pointer hover:text-red-light transition-all duration-200 ease-in-out"
						onClick={() => {
							onSubmit?.(undefined);
						}}
					/>
				)}
			</div>
			<Button
				label={label}
				onClick={() => {
					ref.current?.click();
				}}
			/>
		</div>
	);
};

export default FileUpload;
