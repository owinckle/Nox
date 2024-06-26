import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		// Redirect them to the /login page, but save the current location they were trying to go to
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export default PrivateRoute;
