import React from 'react';

interface Props {
	name: string;
	label: string;
	placeholder: string;
	onChange: (value: any) => void;
	value: any;
	type?: 'text' | 'email' | 'password';
	error?: string;
}
const InputField: React.FC<Props> = ({
	name,
	label,
	placeholder,
	onChange,
	value,
	type = 'text',
	error,
}) => {
	return (
		<div className="w-64 h-20 flex flex-col justify-start items-start relative">
			<label className={`text-white`} htmlFor={name}>
				{label}
			</label>

			<div
				className={`w-64 h-12 bg-black border-b-2 ${
					error ? 'border-b-red' : 'border-b-white'
				} flex justify-start items-center`}
			>
				<input
					id={name}
					name={name}
					type={type}
					className="bg-inherit w-full h-full text-white outline-none"
					placeholder={placeholder}
					onChange={onChange}
					value={value}
				/>
			</div>
			<p className="text-red text-xs font-bold absolute bottom-0 left-0 translate-y-1/2">
				{error}
			</p>
		</div>
	);
};

export default InputField;
