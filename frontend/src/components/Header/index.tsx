import "./styles.scss";
import { RxHamburgerMenu } from "react-icons/rx";

export const Header = () => {
	const toggleMenu = () => {
		document.body.classList.toggle("mobile-menu-open");
	};

	return (
		<div className="header">
			<div className="header__burger__container">
				<RxHamburgerMenu onClick={toggleMenu} />
			</div>
			<div className="header__title">Nox</div>
		</div>
	);
};
