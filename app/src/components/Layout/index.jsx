import "./styles.scss";

export const Shell = ({ withHeader, children }) => {
	return (
		<div className={`shell ${withHeader && "shell--with-header"}`}>
			{withHeader ? (
				<>
					{children[0]}
					{/* Map all childrens starting from 1 */}
					<div className="shell__content">{children.slice(1)}</div>
				</>
			) : (
				children
			)}
		</div>
	);
};

export const Main = ({ children }) => {
	return <div className="main">{children}</div>;
};

export const MainTitle = ({ children }) => {
	return <div className="main__title">{children}</div>;
};
