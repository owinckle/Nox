import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface AuthRouteProps {
	children: JSX.Element;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (isAuthenticated) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
};

export default AuthRoute;
