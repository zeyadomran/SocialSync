import React, { ReactNode, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface Props {
	label: string;
	name: string;
	items: string[];
	onSelected: (item: string) => void;
	selected: string;
	error?: string;
}
const Dropdown: React.FC<Props> = ({
	name,
	label,
	items,
	onSelected,
	selected,
	error,
}) => {
	const [s, setSelected] = useState(selected);
	const [expanded, setExpanded] = useState(false);

	return (
		<div
			className={`w-full h-20 flex flex-col justify-start items-start relative gap-1`}
		>
			<label className={`text-grey`} htmlFor={name}>
				{label}
			</label>

			<div
				id={name}
				className={`w-full min-w-[16rem] h-12 border-2 bg-blue-dark ${
					error && !expanded
						? 'border-red'
						: 'border-blue-dark focus:border-blue'
				} flex justify-start items-center rounded-md outline-none text-white relative`}
			>
				<select name={name} id={name} className="hidden" />
				<div
					className={`${
						s !== '' ? 'text-white' : 'text-[#9CA3AF]'
					} h-12 w-full cursor-pointer px-2 flex items-center justify-between`}
					onClick={() => setExpanded(!expanded)}
				>
					{s !== '' ? s : 'no selection'}
					<HiOutlineChevronDown className={`w-6 h-6 ${error && 'text-red'}`} />
				</div>
				<div
					className={`min-w-[16rem] w-full absolute top-0 left-0 z-10 shadow-md  rounded-md bg-blue-dark flex flex-col items-start justify-start ${
						!expanded && 'hidden'
					}`}
				>
					{['', ...items].map((item, index) => (
						<div
							key={index}
							className={`${
								s === item ? 'bg-blue' : 'bg-inherit'
							} h-12 w-full hover:bg-blue cursor-pointer p-1 flex items-center justify-start border-blue border-b-2 border-x-2 transition-all duration-200 ease-in-out ${
								index === 0
									? 'rounded-t-md border-t-2'
									: index === items.length
									? 'rounded-b-md'
									: ''
							}`}
							onClick={() => {
								if (index === 0) {
									onSelected('');
									setSelected('');
								} else {
									onSelected(items[index - 1]);
									setSelected(items[index - 1]);
								}
								setExpanded(false);
							}}
						>
							{item !== '' ? item : 'None'}
						</div>
					))}
				</div>
			</div>

			<p className="text-red text-xs font-bold absolute top-full left-2">
				{error}
			</p>
		</div>
	);
};

export default Dropdown;
