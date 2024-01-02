import "./styles/plans.scss";
import { useEffect, useState } from "react";
import {
	AppShell,
	LayoutHeader,
	LayoutMedium,
	LayoutSubtitle,
	LayoutTitle,
} from "../components/Layout";
import { Card } from "../components/Card";
import {
	Sidebar,
	SidebarHeader,
	SidebarItem,
	SidebarSection,
} from "../components/Sidebar";
import { FiHome } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
	import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
);

const Plans = () => {
	const { user, logout } = useAuth();

	const [plans, setPlans] = useState<[]>([]);

	const getPlans = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_API_BASE_URL}/plans`
		);
		const data = await response.json();
		setPlans(data);
	};

	useEffect(() => {
		getPlans();
	}, []);

	const handleCheckout = async (priceId: string) => {
		const stripe = await stripePromise;

		const response = await fetch(
			`${import.meta.env.VITE_API_BASE_URL}/subscription/session/create/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ price_id: priceId }),
			}
		);

		const session = await response.json();
		console.log(session);

		const result = await stripe?.redirectToCheckout({
			sessionId: session.session_id,
		});

		if (result?.error) {
			console.error(result.error.message);
		}
	};

	return (
		<AppShell>
			<Sidebar>
				<SidebarHeader
					logo="https://i.gyazo.com/047076012ad802f9e016fc92ac439ad7.png"
					title="Nox"
					subtitle="Welcome back, John Doe!"
				/>

				<SidebarSection name="General" noHeader>
					<SidebarItem icon={<FiHome />} label="Home" target="/" />
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
						active
					/>
					<SidebarItem
						icon={<IoMdLogOut />}
						label="Logout"
						onClick={logout}
					/>
				</SidebarSection>
			</Sidebar>

			<LayoutMedium className="plans">
				<LayoutHeader>
					<LayoutTitle>Plans</LayoutTitle>
					<LayoutSubtitle>
						{user.plan === "Free"
							? "You are currently on the free plan, upgrade to unlock more features!"
							: `You are currently subscribed to the ${user.plan} plan`}
					</LayoutSubtitle>
				</LayoutHeader>
				<div className="plan__list">
					{plans.map((plan: any) => (
						<Card key={plan.id} title={plan.name}>
							<div className="plan__price">${plan.price}/mo</div>
							<div className="plan__description">
								Included in the plan:
							</div>
							<div className="plan__features">
								{plan.features
									.split("\n")
									.map((feature: any, k: any) => (
										<div key={k} className="plan__feature">
											✓ {feature}
										</div>
									))}
							</div>
							<Button
								onClick={() => handleCheckout(plan.price_id)}
							>
								Select plan
							</Button>
						</Card>
					))}
				</div>
			</LayoutMedium>
		</AppShell>
	);
};

export default Plans;
