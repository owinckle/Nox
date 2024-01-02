import "./styles.scss";

interface Props {
	logo: string;
	closing: boolean;
}

const Loader = ({ logo, closing }: Props) => {
	return (
		<div className={`loader ${closing && "closing"}`}>
			<img className="loader__logo" src={logo} />
		</div>
	);
};

export default Loader;
