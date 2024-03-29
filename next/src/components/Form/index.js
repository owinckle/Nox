import Button from "../Button";


export const Form = ({ onSubmit, submitLabel, children }) => {
	return (
		<form onSubmit={onSubmit}>
			{children}
			<Button onClick={onSubmit}>{submitLabel}</Button>
			<input type="submit" hidden />
		</form>
	);
};

export const FormGroup = ({
	label,
	type,
	placeholder,
	value,
	onChange,
	autoFocus,
	children,
}) => {
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