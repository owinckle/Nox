import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";

const Landing = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<div>Redirect to the actual landing page</div>}
			/>

			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
};

export default Landing;
