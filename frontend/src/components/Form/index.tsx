import "./styles.scss";
import Button from "../Button";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface FormProps {
	onSubmit: () => void;
	submitLabel: string;
	children?: React.ReactNode;
}

export const Form = ({ onSubmit, submitLabel, children }: FormProps) => {
	return (
		<form onSubmit={onSubmit}>
			{children}
			<Button onClick={onSubmit}>{submitLabel}</Button>
			<input type="submit" hidden />
		</form>
	);
};

interface FormGroupProps {
	label: string;
	type: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
	children?: React.ReactNode;
}

export const FormGroup = ({
	label,
	type,
	placeholder,
	value,
	onChange,
	autoFocus,
	children,
}: FormGroupProps) => {
	return (
		<div className="form-group">
			<label>{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoFocus={autoFocus}
			/>

			{children}
		</div>
	);
};

interface ColorSelectorProps {
	label: string;
	colors: string[];
	currentColor: string;
	onChange: (color: string) => void;
}

export const ColorSelector = ({
	label,
	colors,
	currentColor,
	onChange,
}: ColorSelectorProps) => {
	const handleSelect = (color: string) => {
		onChange(color);
	};

	return (
		<div className="form-group">
			<label>{label}</label>
			<div className="color-selector">
				{colors.map((color, k) => (
					<div
						key={k}
						className="color-selector__color"
						style={{ backgroundColor: color }}
						onClick={() => handleSelect(color)}
					>
						{currentColor === color && <FaCheck />}
					</div>
				))}
			</div>
		</div>
	);
};
