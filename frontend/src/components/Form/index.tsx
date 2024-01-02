import "./styles.scss";
import Button from "../Button";

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
	children?: React.ReactNode;
}

export const FormGroup = ({
	label,
	type,
	placeholder,
	value,
	onChange,
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
			/>

			{children}
		</div>
	);
};
