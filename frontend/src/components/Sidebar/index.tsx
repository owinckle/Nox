import { log } from "console";
import "./styles.scss";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
	children?: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
	return <div className="sidebar">{children}</div>;
};

interface SidebarHeaderProps {
	logo?: string;
	title?: string;
	subtitle?: string;
}

export const SidebarHeader = ({
	logo,
	title,
	subtitle,
}: SidebarHeaderProps) => {
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

interface SidebarItemProps {
	icon?: React.ReactNode;
	label: string;
	target?: string;
	partialTarget?: string;
	onClick?: () => void | false;
}

export const SidebarItem = ({
	icon,
	label,
	target,
	partialTarget,
	onClick,
}: SidebarItemProps) => {
	if (onClick) {
		return (
			<div className="sidebar__item" onClick={onClick}>
				{icon}
				<div className="sidebar__item__label">{label}</div>
			</div>
		);
	} else if (target) {
		const [active, setActive] = useState<boolean>(false);
		const location = useLocation();

		useEffect(() => {
			// Get the path but remove the last / if any
			const pathStripped = location.pathname.replace(/\/$/, "");
			if (!partialTarget) {
				setActive(
					location.pathname === target || pathStripped === target
				);
			} else {
				setActive(location.pathname.includes(partialTarget));
			}
		}, [location, target]);

		return (
			<Link to={target} className={`sidebar__item ${active && "active"}`}>
				{icon}
				<div className="sidebar__item__label">{label}</div>
			</Link>
		);
	}
};

interface SidebarSectionProps {
	name: string;
	collapse?: boolean;
	noHeader?: boolean;
	children?: React.ReactNode;
}

export const SidebarSection = ({
	name,
	collapse = false,
	noHeader = false,
	children,
}: SidebarSectionProps) => {
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const [height, setHeight] = useState<string | number>(0);
	const contentRef = useRef<HTMLDivElement>(null);

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
							className={`sidebar__section__collapse-icon ${
								collapsed && "collapsed"
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
