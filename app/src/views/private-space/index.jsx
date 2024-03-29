import { Sidebar, SidebarItem, SidebarSection } from "../../components/Sidebar";
import { Main, Shell } from "../../components/Layout";
import {
	IoMdBug,
	IoMdBulb,
	IoMdEye,
	IoMdHeart,
	IoMdMap,
	IoMdPeople,
	IoMdSettings,
} from "react-icons/io";
import { MdAutorenew, MdDashboard } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { Header, HeaderRight, HeaderTitle } from "../../components/Header";
import { DropdownLink, ProfileBox } from "../../components/ProfileBox";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import { Routes, Route } from "react-router-dom";
import FeatureRequests from "./FeatureRequests";

const PrivateSpace = () => {
	const { loading, user, openProfile, logout } = useUser();

	const [space, setSpace] = useState(null);
	const getSpace = () => {
		useRequest("POST", "/space/get/", {
			slug: window.location.hostname.split(".")[0],
		}).then((data) => {
			setSpace(data.space);
		});
	};

	useEffect(() => {
		if (!loading && !user) {
			window.location.href = `${window.location.protocol}//${
				import.meta.env.VITE_APP_DOMAIN
			}/login`;
		} else {
			getSpace();
		}
	}, [loading, user]);

	if (loading || !user) {
		return <div>Loading...</div>;
	}

	return (
		<Shell withHeader>
			<Header>
				<HeaderTitle
					logo="https://i.gyazo.com/bb474a15b34f369cece7c438e732e45e.png"
					title={space.name}
					subtitle={`Welcome back, ${user.name}!`}
				/>

				<HeaderRight>
					<ProfileBox user={user}>
						<DropdownLink onClick={() => openProfile(user)}>
							Profile
						</DropdownLink>
						<DropdownLink>Account Settings</DropdownLink>
						<DropdownLink onClick={logout} danger>
							Logout
						</DropdownLink>
					</ProfileBox>
				</HeaderRight>
			</Header>

			<Sidebar>
				<SidebarItem
					icon={<GoOrganization />}
					label="My Spaces"
					onClick={() => {
						window.location.href = `${
							window.location.protocol
						}//app.${import.meta.env.VITE_APP_DOMAIN}`;
					}}
				/>
				<SidebarItem
					icon={<MdDashboard />}
					label="Dashboard"
					target="/admin"
				/>
				<SidebarItem
					icon={<IoMdEye />}
					label="Public View"
					target="/"
				/>
				<SidebarSection name="Modules" collapse>
					<SidebarItem
						icon={<IoMdBulb />}
						label="Feature Requests"
						target="/admin/feature-requests"
					/>
					<SidebarItem
						icon={<IoMdHeart />}
						label="Feedback"
						target="/admin/feedback"
					/>
					<SidebarItem
						icon={<IoMdBug />}
						label="Bugs"
						target="/admin/bugs"
					/>
					<SidebarItem
						icon={<IoMdMap />}
						label="Roadmap"
						target="/admin/roadmap"
					/>
					<SidebarItem
						icon={<MdAutorenew />}
						label="Changelog"
						target="/admin/changelog"
					/>
				</SidebarSection>
				<SidebarSection name="Space" collapse>
					<SidebarItem
						icon={<IoMdPeople />}
						label="Users"
						target="/admin/users"
					/>
					<SidebarItem
						icon={<GoOrganization />}
						label="Collaborators"
						target="/admin/collaborators"
					/>
					<SidebarItem
						icon={<IoMdSettings />}
						label="Settings"
						target="/admin/settings"
					/>
				</SidebarSection>
			</Sidebar>

			<Main>
				<Routes>
					<Route
						path="/admin/feature-requests"
						element={<FeatureRequests />}
					/>
				</Routes>
			</Main>
		</Shell>
	);
};

export default PrivateSpace;
