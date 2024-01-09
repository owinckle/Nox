import "./styles/settings.scss";
import {
	AppShell,
	LayoutHeader,
	LayoutSmall,
	LayoutSubtitle,
	LayoutTitle,
} from "../components/Layout";
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
import { Card, CardRow } from "../components/Card";
import { Form, FormGroup } from "../components/Form";
import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";

const Settings = () => {
	const navigate = useNavigate();

	const { updateProfile, user, logout } = useAuth();
	const [name, setName] = useState<string>(user.name);
	const [email, setEmail] = useState<string>(user.email);
	const [password, setPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");

	const updateSettings = async (e?: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		await updateProfile(name, email, newPassword, password);
	};

	console.log(user);

	return (
		<AppShell>
			<Sidebar>
				<SidebarHeader
					logo="https://i.gyazo.com/047076012ad802f9e016fc92ac439ad7.png"
					title="Nox"
					subtitle={`Welcome back, ${user.name}!`}
				/>

				<SidebarSection name="General" noHeader>
					<SidebarItem icon={<FiHome />} label="Home" target="/" />
				</SidebarSection>
				<SidebarSection name="Account" collapse>
					<SidebarItem
						icon={<IoSettingsOutline />}
						label="Settings"
						target="/settings"
						active
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

			<LayoutSmall className="settings">
				<LayoutHeader>
					<LayoutTitle>Settings</LayoutTitle>
					<LayoutSubtitle>
						Manage your account settings
					</LayoutSubtitle>
				</LayoutHeader>
				<Card title="Account">
					<Form onSubmit={updateSettings} submitLabel="Save">
						<FormGroup
							label="Name"
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<FormGroup
							label="E-mail"
							type="email"
							placeholder="E-mail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<FormGroup
							label="New password"
							type="password"
							placeholder="••••••••••"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>

						<FormGroup
							label="Current password"
							type="password"
							placeholder="••••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form>
				</Card>

				<Card title="Subscriptions">
					<CardRow
						label="Current plan"
						value={user.subscription.plan}
					/>
					<CardRow label="Status" value="Active" />

					{user.plan !== "Free" && (
						<CardRow
							label="Next billing date"
							value="September 1, 2021"
						/>
					)}

					<Button onClick={() => navigate("/plans")}>
						{user.plan === "Free"
							? "Upgrade"
							: "Update your subscription"}
					</Button>
				</Card>
			</LayoutSmall>
		</AppShell>
	);
};

export default Settings;