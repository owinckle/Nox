import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";


export const Sidebar = ({ children }) => {
	return <div className="sidebar">{children}</div>;
};

export const SidebarHeader = ({
	logo,
	title,
	subtitle,
}) => {
	return (
		<div className="sidebar__header">
			<img src={logo} className="sidebar__header__logo" />
			<div className="sidebar__header__text">
				<div className="sidebar__header__title">{title}</div>
				<div className="sidebar__header__subtitle">{subtitle}</div>
			</div>
		</div>
	);
};

export const SidebarItem = ({
	icon,
	label,
	target,
	partialTarget,
	active = false,
	onClick,
}) => {
	if (onClick) {
		return (
			<div className="sidebar__item" onClick={onClick}>
				<div className="sidebar__item__icon">{icon}</div>
				<div className="sidebar__item__label">{label}</div>
			</div>
		);
	} else if (target) {

		return (
			<a href={target} className={`sidebar__item ${active && "active"}`}>
				<div className="sidebar__item__icon">{icon}</div>
				<div className="sidebar__item__label">{label}</div>
			</a>
		);
	}
};

export const SidebarSection = ({
	name,
	collapse = false,
	noHeader = false,
	children,
}) => {
	const [collapsed, setCollapsed] = useState(false);
	const [height, setHeight] = useState(0);
	const contentRef = useRef(null);

	useEffect(() => {
		if (collapse && contentRef.current) {
			setHeight(collapsed ? 0 : contentRef.current.scrollHeight);
		}
	}, [collapsed, collapse, children]);

	return (
		<div className="sidebar__section">
			{!noHeader && (
				<div
					className="sidebar__section__header"
					onClick={() => setCollapsed(!collapsed)}
				>
					<div className="sidebar__section__name">{name}</div>
					{collapse && (
						<AiOutlineDown
							className={`sidebar__section__collapse-icon ${collapsed && "collapsed"
								}`}
						/>
					)}
				</div>
			)}
			<div
				className="sidebar__section__content"
				ref={contentRef}
				style={{
					height: collapse ? height : "auto",
					overflow: "hidden",
				}}
			>
				{children}
			</div>
		</div>
	);
};
