import React from 'react';

interface Props {
	name: string;
	label: string;
	placeholder: string;
	onChange: (value: any) => void;
	value: any;
	type?: 'text' | 'email' | 'password' | 'textarea';
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
		<div
			className={`w-full ${
				type === 'textarea' ? 'min-h-[5rem] max-h-[8rem]' : 'h-20'
			} flex flex-col justify-start items-start relative gap-1`}
		>
			<label className={`text-grey`} htmlFor={name}>
				{label}
			</label>
			{type === 'textarea' ? (
				<textarea
					id={name}
					name={name}
					className={`p-2 w-full min-h-[3rem] min-w-[16rem] border-2 bg-blue-dark ${
						error ? 'border-red' : 'border-blue-dark focus:border-blue'
					} flex justify-start items-center rounded-md px-2 outline-none text-white`}
					placeholder={placeholder}
					onChange={onChange}
					value={value || ''}
				/>
			) : (
				<input
					id={name}
					name={name}
					type={type}
					className={`w-full min-w-[16rem] h-12 border-2 bg-blue-dark ${
						error ? 'border-red' : 'border-blue-dark focus:border-blue'
					} flex justify-start items-center rounded-md px-2 outline-none text-white`}
					placeholder={placeholder}
					onChange={onChange}
					value={value || ''}
				/>
			)}
			<p className="text-red text-xs font-bold absolute top-full left-2">
				{error}
			</p>
		</div>
	);
};

export default InputField;
