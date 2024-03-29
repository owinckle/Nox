import Button from "../Button";
import "./styles.scss";

export const Form = ({ onSubmit, submitLabel, children }) => {
	const submitHandler = (e) => {
		e.preventDefault();

		if (onSubmit) {
			onSubmit();
		}
	};

	return (
		<form onSubmit={submitHandler}>
			{children}
			{submitLabel && (
				<>
					<Button onClick={submitHandler}>{submitLabel}</Button>
					<input type="submit" style={{ display: "none" }} />
				</>
			)}
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
	style,
	className,
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
				className={className}
				style={style}
			/>
		</div>
	);
};
