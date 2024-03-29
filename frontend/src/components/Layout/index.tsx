import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Link, useLocation } from "react-router-dom";

interface Props {
	className?: string;
	children?: React.ReactNode;
}

export const AppShell = ({ className, children }: Props) => {
	return <div className={`app-shell ${className}`}>{children}</div>;
};

export const LayoutFull = ({ className, children }: Props) => {
	return <div className={`layout ${className}`}>{children}</div>;
};

export const LayoutMedium = ({ className, children }: Props) => {
	return (
		<div className={`layout layout--medium ${className}`}>{children}</div>
	);
};

export const LayoutSmall = ({ className, children }: Props) => {
	return (
		<div className={`layout layout--small ${className}`}>{children}</div>
	);
};

export const LayoutHeader = ({ className, children }: Props) => {
	return <div className={`layout__header ${className}`}>{children}</div>;
};

export const LayoutTitle = ({ className, children }: Props) => {
	return <div className={`layout__title ${className}`}>{children}</div>;
};

export const LayoutSubtitle = ({ className, children }: Props) => {
	return <div className={`layout__subtitle ${className}`}>{children}</div>;
};

interface LayoutNavProps {
	children: React.ReactNode;
}

export const LayoutNav = ({ children }: LayoutNavProps) => {
	return <div className="layout-nav">{children}</div>;
};

interface LayoutNavItemProps {
	label: string;
	target: string;
}
export const LayoutNavItem = ({ label, target }: LayoutNavItemProps) => {
	const [active, setActive] = useState<boolean>(false);
	const location = useLocation();

	useEffect(() => {
		// Get the path but remove the last / if any
		const pathStripped = location.pathname.replace(/\/$/, "");
		setActive(location.pathname === target || pathStripped === target);
	}, [location, target]);
	return (
		<Link to={target} className={`layout-nav__item ${active && "active"}`}>
			{label}
		</Link>
	);
};
