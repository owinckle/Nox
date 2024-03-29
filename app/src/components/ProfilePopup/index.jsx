import { useState } from "react";
import "./styles.scss";
import { IoMdClose } from "react-icons/io";

export const ProfilePopup = ({ title, profile, onClose }) => {
	const [closing, setClosing] = useState(false);

	const closeHandler = () => {
		setClosing(true);
		setTimeout(() => {
			onClose();
		}, 200);
	};

	return (
		<div className={`profile-popup ${closing ? "closing" : ""}`}>
			<div className="profile-popup__head">
				<div className="profile-popup__head__title">{title}</div>
				<IoMdClose
					className="profile-popup__head__close"
					size={15}
					onClick={closeHandler}
				/>
			</div>

			<div className="profile-popup__content">
				{profile && profile.avatar ? (
					<img
						className="profile-popup__content__avatar"
						src={profile.avatar}
					/>
				) : (
					<div className="profile-popup__content__avatar">
						{profile.name.charAt(0)}
					</div>
				)}

				<div className="profile-popup__content__info">
					<div className="profile-popup__content__info__name">
						{profile.name}
					</div>
					<div className="profile-popup__content__info__rank">
						Level {profile.rank.level}
					</div>
					<div className="profile-popup__content__info__xp">
						<div
							className="profile-popup__content__info__xp__fill"
							style={{
								width: `${
									(profile.rank.xp / profile.rank.maxXp) * 100
								}%`,
							}}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
};
