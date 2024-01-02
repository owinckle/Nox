import React from "react";
import "./styles.scss";

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
	return <div className="layout__header">{children}</div>;
};

export const LayoutTitle = ({ className, children }: Props) => {
	return <div className="layout__title">{children}</div>;
};

export const LayoutSubtitle = ({ className, children }: Props) => {
	return <div className="layout__subtitle">{children}</div>;
};
