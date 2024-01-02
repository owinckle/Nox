import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/global.scss";
import AuthRoute from "./components/AuthRoute";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Plans from "./pages/Plans";

const App = () => {
	return (
		<Router>
			<Routes>
				{/* Auth Routes */}
				<Route
					path="/login"
					element={
						<AuthRoute>
							<LoginPage />
						</AuthRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<AuthRoute>
							<RegisterPage />
						</AuthRoute>
					}
				/>

				{/* App Routes */}
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
				<Route
					path="/settings"
					element={
						<PrivateRoute>
							<Settings />
						</PrivateRoute>
					}
				/>
				<Route
					path="/plans"
					element={
						<PrivateRoute>
							<Plans />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
