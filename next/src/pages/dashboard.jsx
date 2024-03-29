import { useEffect, useState } from "react";
import { getSubdomain } from "@/utils";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import {
	Sidebar,
	SidebarHeader,
	SidebarSection,
	SidebarItem,
} from "@/components/Sidebar";
import { IoMdAdd } from "react-icons/io";
import Circle from "@/components/Circle";
import useRequest from "@/hooks/useRequest";

export async function getServerSideProps(context) {
	const subdomain = getSubdomain(context);

	useRequest("POST", "space/exists/", { name: subdomain }).then(
		(response) => {
			if (!response.exists) {
				router.push("/");
			}
		}
	);

	return {
		props: {
			subdomain: subdomain,
		},
	};
}

export default function Dashboard({ subdomain }) {
	const router = useRouter();
	const { isAuthenticated, user } = useAuth();

	const [space, setSpace] = useState(null);
	const [member, setMember] = useState(null);
	const getSpace = () => {
		const errorCallback = (response) => {
			console.log(response);
			router.push("/");
		};

		useRequest(
			"POST",
			"/space/get/",
			{ slug: subdomain },
			errorCallback
		).then((data) => {
			if (!data.is_staff) {
				router.push("/");
			}

			setSpace(data.space);
			setMember({
				role: data.role,
			});
		});
	};

	useEffect(() => {
		if (!isAuthenticated) {
			router.push(
				`${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${subdomain}.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
			);
		}

		getSpace();
	}, []);

	return (
		<div className="dashboard">
			<Sidebar>
				<SidebarHeader
					logo="https://i.gyazo.com/bb474a15b34f369cece7c438e732e45e.png"
					title={space?.name}
					subtitle={
						member?.role.charAt(0).toUpperCase() +
						member?.role.slice(1)
					}
				/>

				<SidebarSection name="Boards" collapse>
					<SidebarItem
						icon={<IoMdAdd />}
						label="New Post"
						target="/changelogs/drafts"
					/>
					<SidebarItem
						icon={<Circle />}
						label="All Posts"
						target="/boards"
					/>
					<SidebarItem
						icon={<Circle color="#1fb85c" />}
						label="Feature Requests"
						target="/boards/open"
					/>

					<SidebarItem
						icon={<Circle color="#ff4444" />}
						label="Feedback"
						target="/boards/closed"
					/>
				</SidebarSection>

				<SidebarSection name="Bugs" collapse>
					<SidebarItem
						icon={<IoMdAdd />}
						label="Submit Bug"
						target="/changelogs/drafts"
					/>
					<SidebarItem icon={<Circle />} label="All" target="/bugs" />
				</SidebarSection>

				<SidebarSection name="Roadmap" collapse>
					<SidebarItem
						icon={<IoMdAdd />}
						label="Add"
						target="/changelogs/drafts"
					/>
					<SidebarItem
						icon={<Circle />}
						label="Coming Soon"
						target="/roadmap"
					/>
					<SidebarItem
						icon={<Circle color="#ffbb33" />}
						label="Under Review"
						target="/roadmap"
					/>
					<SidebarItem
						icon={<Circle color="#1fb85c" />}
						label="Launched"
						target="/roadmap"
					/>
				</SidebarSection>

				<SidebarSection name="Changelogs" collapse>
					<SidebarItem
						icon={<IoMdAdd />}
						label="New"
						target="/changelogs/drafts"
					/>
					<SidebarItem
						icon={<Circle color="#1fb85c" />}
						label="Published"
						target="/changelogs"
					/>
					<SidebarItem
						icon={<Circle color="#ffbb33" />}
						label="Drafts"
						target="/changelogs/drafts"
					/>
				</SidebarSection>
			</Sidebar>
		</div>
	);
}
