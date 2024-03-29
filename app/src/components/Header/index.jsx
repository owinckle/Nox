import "./styles.scss";

export const Header = ({ children }) => {
	return <div className="header">{children}</div>;
};

export const HeaderTitle = ({ logo, title, subtitle }) => {
	return (
		<div className="header__title">
			{logo && <img className="header__title__logo" src={logo} />}
			<div className="header__title__text">
				<div className="header__title__text__title">{title}</div>
				<div className="header__title__text__subtitle">{subtitle}</div>
			</div>
		</div>
	);
};

export const HeaderRight = ({ children }) => {
	return <div className="header__right">{children}</div>;
};
