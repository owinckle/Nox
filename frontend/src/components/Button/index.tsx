import "./styles.scss";

interface ButtonProps {
	onClick?: () => void;
	variant?: "danger" | "success" | "warning" | "disabled";
	children: React.ReactNode;
}

const Button = ({ onClick, variant, children }: ButtonProps) => {
	return (
		<div className={`button button-${variant}`} onClick={onClick}>
			{children}
		</div>
	);
};

export default Button;
