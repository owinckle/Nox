import "./styles.scss";
import React from "react";

interface CardProps {
	title: string;
	className?: string;
	noHeader?: boolean;
	action?: () => void;
	actionIcon?: React.ReactNode;
	onClick?: () => void;
	children?: React.ReactNode;
}

export const Card = ({
	title,
	className,
	noHeader,
	action,
	actionIcon,
	onClick,
	children,
}: CardProps) => {
	return (
		<div className={`card ${className}`} onClick={onClick}>
			{!noHeader && (
				<div className="card__header">
					<div className="card__title">{title}</div>
					{action && (
						<div className="card__action" onClick={action}>
							{actionIcon}
						</div>
					)}
				</div>
			)}
			<div className="card__body">{children}</div>
		</div>
	);
};

interface CardRowProps {
	label: string;
	value: string;
}

export const CardRow = ({ label, value }: CardRowProps) => {
	return (
		<div className="card__row">
			<div className="card__row__label">{label}</div>
			<div className="card__row__value">{value}</div>
		</div>
	);
};
