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
import { FiHome } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import useAuth from "./hooks/useAuth";
import { MdOutlinePayment } from "react-icons/md";
import { Header } from "./components/Header";

const App = () => {
	const { user, logout } = useAuth();

	return (
		<Router>
			{user && <Header />}
			<AppShell>
				{user && (
					<>
						<Sidebar>
							<SidebarHeader
								logo="https://i.gyazo.com/9164877359edc20b8f1868544fe98bde.png"
								title="Nox"
								subtitle={`Welcome back, ${user.name}!`}
							/>

							<SidebarSection name="General" noHeader>
								<SidebarItem
									icon={<FiHome />}
									label="Home"
									target="/"
								/>
							</SidebarSection>

							<SidebarSection name="Account" collapse>
								<SidebarItem
									icon={<IoSettingsOutline />}
									label="Settings"
									target="/settings"
								/>
								<SidebarItem
									icon={<MdOutlinePayment />}
									label="Plans"
									target="/plans"
								/>
								<SidebarItem
									icon={<IoMdLogOut />}
									label="Logout"
									onClick={logout}
								/>
							</SidebarSection>
						</Sidebar>
					</>
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
			</AppShell>
		</Router>
	);
};

export default App;
