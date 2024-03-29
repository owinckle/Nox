import "./styles.scss";

const Circle = ({ variant, size = 5 }) => {
	return (
		<div
			className={`circle circle--${variant}`}
			style={{ height: `${size}px`, width: `${size}px` }}
		></div>
	);
};

export default Circle;
