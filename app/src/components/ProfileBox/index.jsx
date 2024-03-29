import "./styles.scss";
import { useRef, useState } from "react";

export const ProfileBox = ({ user, children }) => {
	const dropdownRef = useRef(null);
	const [dropdownHeight, setDropdownHeight] = useState(0);
	const openDropdown = () => {
		setDropdownHeight(dropdownRef.current.scrollHeight);
	};

	const closeDropdown = () => {
		setDropdownHeight(0);
	};

	return (
		<div
			className="profile-box"
			onMouseEnter={openDropdown}
			onMouseLeave={closeDropdown}
		>
			{user && user.avatar ? (
				<img className="profile-box__avatar" src={user.avatar} />
			) : (
				<div className="profile-box__avatar">{user.name.charAt(0)}</div>
			)}
			<div className="profile-box__text">
				<div className="profile-box__text__name">
					{user ? user.name : "Profile"}
				</div>
				<div className="profile-box__text__rank">
					<div className="profile-box__text__rank__level">
						<div className="profile-box__text__rank__level__label">
							Level
						</div>
						<div className="profile-box__text__rank__level__value">
							{user?.rank.level}
						</div>
					</div>
					<div className="profile-box__text__rank__xp-bar">
						<div
							className="profile-box__text__rank__xp-bar__fill"
							style={{
								width: `${
									user
										? (user.rank.xp / user.rank.max_xp) *
										  100
										: 0
								}%`,
							}}
						></div>
					</div>
				</div>
			</div>

			<div
				className="profile-box__dropdown"
				ref={dropdownRef}
				style={{
					height: dropdownHeight,
				}}
			>
				{children}
			</div>
		</div>
	);
};

export const DropdownLink = ({ target, onClick, danger, children }) => {
	if (target) {
		return (
			<div
				className={`profile-box__dropdown__item ${danger && "danger"}`}
			>
				{children}
			</div>
		);
	}
	return (
		<div
			className={`profile-box__dropdown__item ${danger && "danger"}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};
