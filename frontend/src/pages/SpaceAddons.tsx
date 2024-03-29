import { toast } from "react-toastify";
import Button from "../components/Button";
import { Card } from "../components/Card";
import useRequest from "../hooks/useRequest";

interface Props {
	space: any;
	getSpace: () => void;
}

const SpaceAddons = ({ space, getSpace }: Props) => {
	if (!space) {
		return null;
	}

	const updateAddon = (addon: string, status: boolean) => {
		useRequest("POST", "/space/addon/update/", {
			name: space.name,
			addon,
			status,
		})
			.then((data) => {
				const addon_name =
					addon[0].toUpperCase() + addon.slice(1).replace("_", " ");
				if (status) {
					toast.success(`${addon_name} has been enabled.`);
				} else {
					toast.error(`${addon_name} has been disabled.`);
				}
				getSpace();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="space">
			<div className="space__addons">
				<Addon
					name="Roadmap"
					enabled={space.addon_roadmap}
					onToggle={() =>
						updateAddon("roadmap", !space.addon_roadmap)
					}
					description="Showcase your product's past achievements, current development and future plans."
				/>
				<Addon
					name="Feature Requests"
					enabled={space.addon_feature_requests}
					onToggle={() =>
						updateAddon(
							"feature_requests",
							!space.addon_feature_requests
						)
					}
					description="Allow your users to publicly submit feature requests and vote on them."
				/>
				<Addon
					name="Bugs"
					enabled={space.addon_bugs}
					onToggle={() => updateAddon("bugs", !space.addon_bugs)}
					description="Allow your users to easily submit bugs and issues."
				/>
			</div>
		</div>
	);
};

interface AddonProps {
	name: string;
	enabled: boolean;
	onToggle: () => void;
	description: string;
}

const Addon = ({ name, enabled, onToggle, description }: AddonProps) => {
	return (
		<Card title={name}>
			<div className="space__addon__description">{description}</div>
			{enabled ? (
				<Button variant="danger" onClick={onToggle}>
					Disable
				</Button>
			) : (
				<Button variant="success" onClick={onToggle}>
					Enable
				</Button>
			)}
		</Card>
	);
};

export default SpaceAddons;
