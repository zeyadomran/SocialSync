import React, { ReactNode, useRef, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import Button from '../Button';
import { HiOutlineX } from 'react-icons/hi';

interface Props {
	label: string;
	onSubmit?: (file: File | undefined) => void;
}
const FileUpload: React.FC<Props> = ({ label, onSubmit }) => {
	const ref = useRef<HTMLInputElement>(null);
	const [filename, setFilename] = useState<string | undefined>(undefined);

	return (
		<div className="flex flex-col items-start justify-center gap-2">
			<input
				type="file"
				className="hidden"
				ref={ref}
				onChange={(e) => {
					onSubmit?.(e.target.files?.[0]);
					setFilename(e.target.files?.[0]?.name);
				}}
				accept="image/png, image/jpeg, image/jpg"
			/>
			<div className="flex items-center justify-between w-32 gap-1 ">
				<p
					className="text-white text-sm text-ellipsis overflow-hidden whitespace-nowrap"
					title={filename ?? 'No image selected'}
				>
					{filename ?? 'No image selected'}
				</p>
				{filename && (
					<HiOutlineX
						className="text-red w-6 h-6 cursor-pointer hover:text-red-light transition-all duration-200 ease-in-out"
						onClick={() => {
							onSubmit?.(undefined);
							setFilename(undefined);
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
