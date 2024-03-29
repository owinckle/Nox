import "./styles/space.scss";
import { Route, Routes, useParams } from "react-router-dom";
import {
	LayoutFull,
	LayoutHeader,
	LayoutNav,
	LayoutNavItem,
	LayoutTitle,
} from "../components/Layout";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import SpaceDashboard from "./SpaceDashboard";
import SpaceAddons from "./SpaceAddons";
import SpaceSettings from "./SpaceSettings";
import SpaceRoadmap from "./SpaceRoadmap";

const Space = () => {
	const { name } = useParams();

	const [space, setSpace] = useState<any>(null);
	const getSpace = () => {
		useRequest("POST", "/space/get/", { name })
			.then((data) => {
				setSpace(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getSpace();
	}, [name]);

	return (
		<LayoutFull>
			<LayoutHeader>
				<LayoutTitle>{name}</LayoutTitle>
				<LayoutNav>
					<LayoutNavItem
						label="Dashboard"
						target={`/space/${name}`}
					/>

					{space?.addon_roadmap && (
						<LayoutNavItem
							label="Roadmap"
							target={`/space/${name}/roadmap`}
						/>
					)}

					{space?.addon_feature_requests && (
						<LayoutNavItem
							label="Feature Requests"
							target={`/space/${name}/feature-requests`}
						/>
					)}

					{space?.addon_bugs && (
						<LayoutNavItem
							label="Bugs"
							target={`/space/${name}/bugs`}
						/>
					)}

					<LayoutNavItem
						label="Addons"
						target={`/space/${name}/addons`}
					/>
					<LayoutNavItem
						label="Settings"
						target={`/space/${name}/settings`}
					/>
				</LayoutNav>
			</LayoutHeader>

			<Routes>
				<Route
					index
					element={
						<SpaceDashboard space={space} getSpace={getSpace} />
					}
				/>

				<Route
					path="addons"
					element={<SpaceAddons space={space} getSpace={getSpace} />}
				/>

				<Route
					path="settings"
					element={
						<SpaceSettings space={space} getSpace={getSpace} />
					}
				/>

				<Route
					path="roadmap"
					element={<SpaceRoadmap space={space} getSpace={getSpace} />}
				/>

				<Route
					path="feature-requests"
					element={<div>Feature Requests</div>}
				/>

				<Route path="bugs" element={<div>Bugs</div>} />
			</Routes>
		</LayoutFull>
	);
};

export default Space;
