import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FormGroup } from "@/components/Form";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { IoCheckmarkOutline } from "react-icons/io5";
import useRequest from "@/hooks/useRequest";

const Onboarding = () => {
	const router = useRouter();
	const { isAuthenticated, user } = useAuth();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push(
				`${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_DOMAIN}/login`
			);
		}
		if (isAuthenticated && user.onboarding_complete) {
			router.push(
				`${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_DOMAIN}/app`
			);
		}
	}, []);

	const spaceExists = async () => {
		const res = await useRequest("POST", "/space/exists/", {
			name: productName,
		});

		return res.exists;
	};

	const createSpace = async () => {
		useRequest("POST", "/space/create/", {
			name: productName,
			source: productSource,
		}).then((data) => {
			router.push(
				`${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${data.slug}.${process.env.NEXT_PUBLIC_APP_DOMAIN}/dashboard`
			);
		});
	};

	const [step, setStep] = useState(1);

	const [productName, setProductName] = useState("");
	const [productSource, setProductSource] = useState("");

	const validateStep = async () => {
		if (step === 1) {
			if (productName.length === 0) {
				toast.error("Please enter your product name.");
				return;
			}

			const res = await spaceExists();
			console.log(res);
			if (res) {
				toast.error(
					"This subdomain is already taken. Please try another."
				);
				return;
			}

			setStep(2);
		} else if (step === 2) {
			if (productSource === "") {
				toast.error("Please let us know where you heard about us!");
				return;
			}
			setStep(3);
		} else if (step === 3) {
			createSpace();
		}
	};

	const goBackHandler = (to) => {
		if (step > 1 && to !== step && to < step) {
			setStep(to);
		}
	};

	return (
		<div className="onboarding">
			<div className="onboarding__container">
				<div className="onboarding__steps">
					<Step
						number={1}
						name="Create a space"
						currentStep={step}
						goBack={() => goBackHandler(1)}
					/>
					<Step
						number={2}
						name="Where did you hear about us?"
						currentStep={step}
						goBack={() => goBackHandler(2)}
					/>
					<Step
						number={3}
						name="Done"
						currentStep={step}
						goBack={() => goBackHandler(3)}
					/>
				</div>

				{step === 1 && (
					<Modal title="What's your product's name?">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								validateStep();
							}}
						>
							<FormGroup
								label="Product name"
								type="text"
								placeholder="Ace"
								value={productName}
								onChange={(e) => setProductName(e.target.value)}
								autoFocus
							/>
							<div className="form-group">
								<label>Subdomain</label>
								<Button
									variant="disabled"
									className="onboarding__subdomain-preview"
								>
									{productName || (
										<div className="text-sub">ace</div>
									)}
									<span className="text-sub">
										.{process.env.NEXT_PUBLIC_APP_DOMAIN}
									</span>
								</Button>
							</div>
						</form>
						<Button onClick={validateStep}>Continue</Button>
					</Modal>
				)}

				{step === 2 && (
					<Modal title="Where did you hear about us?">
						<Button
							variant={
								productSource === "Google"
									? "default"
									: "neutral"
							}
							onClick={() => setProductSource("Google")}
						>
							Google
						</Button>
						<Button
							variant={
								productSource === "X" ? "default" : "neutral"
							}
							onClick={() => setProductSource("X")}
						>
							X
						</Button>
						<Button
							variant={
								productSource === "Ad" ? "default" : "neutral"
							}
							onClick={() => setProductSource("Ad")}
						>
							Ad
						</Button>
						<Button
							variant={
								productSource === "Directory"
									? "default"
									: "neutral"
							}
							onClick={() => setProductSource("Directory")}
						>
							Directory
						</Button>
						<Button
							variant={
								productSource === "Referral"
									? "default"
									: "neutral"
							}
							onClick={() => setProductSource("Referral")}
						>
							Referral
						</Button>
						<Button
							variant={
								productSource === "Other"
									? "default"
									: "neutral"
							}
							onClick={() => setProductSource("Other")}
						>
							Other
						</Button>
						<Button onClick={validateStep}>Continue</Button>
					</Modal>
				)}

				{step === 3 && (
					<Modal title="Your space has been set up! 🎉">
						<Button onClick={validateStep}>
							Go to your dashboard
						</Button>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default Onboarding;

const Step = ({ number, name, currentStep, goBack }) => {
	return (
		<>
			<div className="onboarding__steps__step" onClick={goBack}>
				<div className="onboarding__steps__step__circle">
					{currentStep > number ? <IoCheckmarkOutline /> : number}
				</div>
				<div className="onboarding__steps__step__name">{name}</div>
			</div>
			<div
				className={`onboarding__steps__step-separator ${
					currentStep > number && "done"
				}`}
			></div>
		</>
	);
};

const Modal = ({ title, children }) => {
	return (
		<div className="onboarding__modal">
			<div className="onboarding__modal__title">{title}</div>
			<div className="onboarding__modal__body">{children}</div>
		</div>
	);
};
