import "./styles/settings.scss";
import {
	LayoutHeader,
	LayoutSmall,
	LayoutSubtitle,
	LayoutTitle,
} from "../components/Layout";
import useAuth from "../hooks/useAuth";
import { Card, CardRow } from "../components/Card";
import { Form, FormGroup } from "../components/Form";
import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Settings = () => {
	const navigate = useNavigate();

	const { updateProfile, user } = useAuth();
	const [name, setName] = useState<string>(user.name);
	const [email, setEmail] = useState<string>(user.email);
	const [password, setPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");

	const updateSettings = async (e?: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		await updateProfile(name, email, newPassword, password);
	};

	return (
		<LayoutSmall className="settings">
			<LayoutHeader>
				<LayoutTitle>Settings</LayoutTitle>
				<LayoutSubtitle>Manage your account settings</LayoutSubtitle>
			</LayoutHeader>
			{!user.is_social && (
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
			)}

			<Card title="Subscriptions">
				<CardRow label="Current plan" value={user.subscription.plan} />
				<CardRow
					label="Status"
					value={
						user.subscription.status.charAt(0).toUpperCase() +
						user.subscription.status.slice(1)
					}
				/>

				{user.subscription.plan !== "Free" && (
					<CardRow
						label={
							user.subscription.status === "active"
								? "Renews on"
								: "Expires on"
						}
						value={user.subscription.next_billing_date}
					/>
				)}

				<Button onClick={() => navigate("/plans")}>
					{user.plan === "Free"
						? "Upgrade"
						: "Update your subscription"}
				</Button>
			</Card>
		</LayoutSmall>
	);
};

export default Settings;
