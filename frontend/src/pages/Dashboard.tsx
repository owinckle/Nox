import { AppShell } from "../components/Layout";
import {
	Sidebar,
	SidebarHeader,
	SidebarItem,
	SidebarSection,
} from "../components/Sidebar";
import { FiHome } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { MdOutlinePayment } from "react-icons/md";

const Dashboard = () => {
	const { user, logout } = useAuth();

	return (
		<AppShell>
			<Sidebar>
				<SidebarHeader
					logo="https://i.gyazo.com/047076012ad802f9e016fc92ac439ad7.png"
					title="Nox"
					subtitle={`Welcome back, ${user.name}!`}
				/>

				<SidebarSection name="General" noHeader>
					<SidebarItem
						icon={<FiHome />}
						label="Home"
						active
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
		</AppShell>
	);
};

export default Dashboard;
