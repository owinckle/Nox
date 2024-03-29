import "./styles.scss";

const Button = ({ onClick, variant, className, children }) => {
	return (
		<div
			className={`button button-${variant} ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Button;
