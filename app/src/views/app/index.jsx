import "./styles.scss";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import useUser from "../../hooks/useUser";
import useRequest from "../../hooks/useRequest";
import { IoCheckmarkOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Form, FormGroup } from "../../components/Form";

const App = () => {
	const { loading, user, logout } = useUser();

	const [spaces, setSpaces] = useState([]);
	const getSpaces = () => {
		useRequest("GET", "/spaces/get/", {}).then((data) => {
			setSpaces(data);
		});
	};

	const [createSpace, setCreateSpace] = useState(false);

	useEffect(() => {
		if (!loading && !user) {
			window.location.href = `${window.location.protocol}//${
				import.meta.env.VITE_APP_DOMAIN
			}/login`;
		} else {
			getSpaces();
		}
	}, [loading, user]);

	if (loading || !user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="app">
			<div className="app__header">
				<a
					className="app__header__site"
					href={`${window.location.protocol}//${
						import.meta.env.VITE_APP_DOMAIN
					}`}
				>
					UserEcho
				</a>
			</div>
			<div className="app__modal">
				<div className="app__modal__header">
					<div className="app__modal__header__title">My Spaces</div>
				</div>

				<div className="app__modal__body">
					{spaces.map((space, k) => (
						<a
							key={k}
							href={`${window.location.protocol}//${space.slug}.${
								import.meta.env.VITE_APP_DOMAIN
							}`}
						>
							<Button variant="bordered">{space.name}</Button>
						</a>
					))}

					{spaces.length === 0 && (
						<p className="text-sub center">
							You don't have any spaces yet.
							<br />
							Create one to get started.
						</p>
					)}
					<Button
						variant="primary"
						onClick={() => setCreateSpace(true)}
					>
						Create Space
					</Button>
				</div>

				<div className="app__modal__footer">
					<div>Logged in as {user.email}</div>
					<div className="text-sub hover" onClick={logout}>
						Log out
					</div>
				</div>
			</div>

			{createSpace && <CreateFlow />}
		</div>
	);
};

export default App;

const CreateFlow = () => {
	const [step, setStep] = useState(1);
	const [spaceName, setSpaceName] = useState("");
	const [brandColor, setBrandColor] = useState("#776bdc");
	const [primaryBgColor, setPrimaryBgColor] = useState("#171a1d");
	const [secondaryBgColor, setSecondaryBgColor] = useState("#1d2025");
	const [primaryTextColor, setPrimaryTextColor] = useState("#f5f5f5");
	const [secondaryTextColor, setSecondaryTextColor] = useState("#b3b3b3");

	const onProductNameChange = (e) => {
		const validPattern = /^[A-Za-z0-9\s\-]+$/;
		const { value } = e.target;
		if (value === "" || validPattern.test(value)) {
			setSpaceName(value);
		}
	};

	const spaceExists = async () => {
		const res = await useRequest("POST", "/space/exists/", {
			name: spaceName,
		});

		return res.exists;
	};

	const validateStep = async () => {
		if (step === 1) {
			if (spaceName.length === 0) {
				toast.error("The space name cannot be empty.");
				return;
			}

			const res = await spaceExists();
			if (res) {
				toast.error("This name is already taken. Please try another.");
				return;
			}
			setStep(2);
		} else if (step === 2) {
			createSpace();
			setStep(3);
		}
	};

	const [spaceCreationLoading, setSpaceCreationLoading] = useState(true);
	const [createdSpaceSlug, setCreatedSpaceSlug] = useState("");

	const createSpace = async () => {
		useRequest("POST", "/space/create/", {
			name: spaceName,
			brand_color: brandColor,
			primary_bg_color: primaryBgColor,
			secondary_bg_color: secondaryBgColor,
			primary_text_color: primaryTextColor,
			secondary_text_color: secondaryTextColor,
		}).then((data) => {
			setCreatedSpaceSlug(data.slug);
			setTimeout(() => {
				setSpaceCreationLoading(false);
			}, 2000);
		});
	};

	return (
		<div className="flow">
			<div className="flow__container">
				<div className="flow__steps">
					<FlowStep number={1} name="Identity" currentStep={step} />
					<FlowStep
						number={2}
						name="Customization"
						currentStep={step}
					/>
					<FlowStep number={3} name="Creation" currentStep={step} />
				</div>

				{step === 1 && (
					<FlowModal title="Set up your space">
						<Form submitLabel="Next" onSubmit={validateStep}>
							<FormGroup
								label="Name"
								type="text"
								placeholder="Ace"
								value={spaceName}
								onChange={onProductNameChange}
								autoFocus
							/>

							<div className="form-group">
								<label>Subdomain</label>
								<Button
									variant="disabled"
									className="flow__subdomain-preview"
								>
									{spaceName
										.replaceAll(" ", "-")
										.toLowerCase() || (
										<div className="text-sub">ace</div>
									)}
									<span className="text-sub">
										.{import.meta.env.VITE_APP_DOMAIN}
									</span>
								</Button>
							</div>
						</Form>
					</FlowModal>
				)}

				{step === 2 && (
					<FlowModal
						title="Customize your space"
						subtitle="These colors can be changed later."
					>
						<Form submitLabel="Next" onSubmit={validateStep}>
							<FormGroup
								label="Brand Color"
								type="color"
								value={brandColor}
								onChange={(e) => setBrandColor(e.target.value)}
								style={{ backgroundColor: brandColor }}
							/>

							<FormGroup
								label="Primary Background Color"
								type="color"
								value={primaryBgColor}
								onChange={(e) =>
									setPrimaryBgColor(e.target.value)
								}
								style={{ backgroundColor: primaryBgColor }}
							/>

							<FormGroup
								label="Secondary Background Color"
								type="color"
								value={secondaryBgColor}
								onChange={(e) =>
									setSecondaryBgColor(e.target.value)
								}
								style={{ backgroundColor: secondaryBgColor }}
							/>

							<FormGroup
								label="Primary Text Color"
								type="color"
								value={primaryTextColor}
								onChange={(e) =>
									setPrimaryBgColor(e.target.value)
								}
								style={{ backgroundColor: primaryTextColor }}
							/>

							<FormGroup
								label="Secondary Text Color"
								type="color"
								value={secondaryTextColor}
								onChange={(e) =>
									setSecondaryTextColor(e.target.value)
								}
								style={{ backgroundColor: secondaryTextColor }}
							/>
						</Form>
					</FlowModal>
				)}

				{step === 3 && (
					<FlowModal
						title={
							spaceCreationLoading
								? `Creating ${spaceName}...`
								: `Your space has been created! 🎉`
						}
					>
						<div
							className={`flow__modal__big-check ${
								spaceCreationLoading && "loading"
							}`}
						>
							<IoCheckmarkOutline />
						</div>

						<a
							href={`${
								window.location.protocol
							}//${createdSpaceSlug}.${
								import.meta.env.VITE_APP_DOMAIN
							}/admin`}
						>
							<Button>Dashboard</Button>
						</a>
					</FlowModal>
				)}
			</div>
		</div>
	);
};

const FlowStep = ({ number, name, currentStep }) => {
	return (
		<>
			<div className="flow__steps__step">
				<div className="flow__steps__step__circle">
					{currentStep > number ? <IoCheckmarkOutline /> : number}
				</div>
				<div className="flow__steps__step__name">{name}</div>
			</div>
			<div
				className={`flow__steps__step-separator ${
					currentStep > number && "done"
				}`}
			></div>
		</>
	);
};

const FlowModal = ({ title, subtitle, children }) => {
	return (
		<div className="flow__modal">
			<div className="flow__modal__title">{title}</div>
			{subtitle && (
				<div className="flow__modal__subtitle">{subtitle}</div>
			)}
			<div className="flow__modal__body">{children}</div>
		</div>
	);
};
