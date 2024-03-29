import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/global.scss";
import AuthRoute from "./components/AuthRoute";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Plans from "./pages/Plans";
import { AppShell } from "./components/Layout";
import {
	Sidebar,
	SidebarHeader,
	SidebarItem,
	SidebarSection,
} from "./components/Sidebar";
import { IoMdAdd } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import useAuth from "./hooks/useAuth";
import { MdOutlinePayment } from "react-icons/md";
import { Header } from "./components/Header";
import Space from "./pages/Space";
import useRequest from "./hooks/useRequest";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const getSubdomain = () => {
	const host = window.location.hostname;
	let parts = host.split(".");
	// Assuming your domain format is always "subdomain.domain.com" or "domain.com" for local development
	// Adjust the logic if you might have different formats (e.g., "subdomain.domain.co.uk")
	if (parts.length >= 3) {
		return parts[0]; // This is your subdomain
	}
	return null; // No subdomain, or it's the main domain
};

const App = () => {
	const { user, logout } = useAuth();

	const [space, setSpace] = useState<any>(null);
	const getSpace = () => {
		useRequest("POST", "/space/get/", {
			subdomain: getSubdomain(),
		}).then((data) => {
			setSpace(data);
		});
	};

	useEffect(() => {
		getSpace();
	}, []);

	return (
		<Router>
			{user && <Header />}
			<AppShell>
				{user && (
					<Sidebar>
						<SidebarHeader
							logo="https://i.gyazo.com/bb474a15b34f369cece7c438e732e45e.png"
							title={import.meta.env.VITE_APP_NAME}
							subtitle={`Welcome back, ${user.name}!`}
						/>

						<SidebarSection name="Space">
							<SidebarItem
								icon={<IoMdAdd />}
								label="Roadmap"
								target="/roadmap"
							/>

							<SidebarItem
								icon={<IoMdAdd />}
								label="Changelog"
								target="/changelog"
							/>
						</SidebarSection>

						<SidebarSection name="Account" collapse>
							<SidebarItem
								icon={<IoSettingsOutline />}
								label="Settings"
								target="/account/settings"
							/>
							<SidebarItem
								icon={<MdOutlinePayment />}
								label="Plans"
								target="/account/plans"
							/>
							<SidebarItem
								icon={<IoMdLogOut />}
								label="Logout"
								onClick={logout}
							/>
						</SidebarSection>
					</Sidebar>
				)}

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
						path="/account/settings"
						element={
							<PrivateRoute>
								<Settings />
							</PrivateRoute>
						}
					/>
					<Route
						path="/account/plans"
						element={
							<PrivateRoute>
								<Plans />
							</PrivateRoute>
						}
					/>
				</Routes>
			</AppShell>
		</Router>
	);
};

export default App;
