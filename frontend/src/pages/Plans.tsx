import "./styles/plans.scss";
import { useEffect, useState } from "react";
import {
	LayoutHeader,
	LayoutMedium,
	LayoutSubtitle,
	LayoutTitle,
} from "../components/Layout";
import { Card } from "../components/Card";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";

import { loadStripe } from "@stripe/stripe-js";
import useModals from "../hooks/useModals";
import useRequest from "../hooks/useRequest";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
	import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
);

const Plans = () => {
	const { getProfile, user } = useAuth();
	const modals = useModals();

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
		if (user.subscription.plan !== "Free") {
			changePlan(priceId);
			return;
		}

		const stripe = await stripePromise;

		const errorCallback = (response: Response) => {
			toast.error("Something went wrong, please try again later.");
			throw new Error(response.statusText);
		};

		useRequest(
			"POST",
			"/subscription/session/create/",
			{
				price_id: priceId,
			},
			errorCallback
		)
			.then((data) => {
				stripe?.redirectToCheckout({
					sessionId: data.session_id,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const cancelSubscription = async () => {
		useRequest("POST", "/subscription/cancel/", {})
			.then(() => {
				toast.success("Your subscription has been cancelled.");
				getProfile();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const reactivateSubscription = async () => {
		useRequest("POST", "/subscription/reactivate/", {})
			.then(() => {
				toast.success("Your subscription has been reactivated.");
				getProfile();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const changePlan = async (priceId: string) => {
		useRequest("POST", "/subscription/change/", {
			price_id: priceId,
		})
			.then(() => {
				toast.success("Your subscription has been changed.");
				getProfile();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<LayoutMedium className="plans">
			<LayoutHeader>
				<LayoutTitle>Plans</LayoutTitle>
				<LayoutSubtitle>
					{user.subscription.plan === "Free"
						? "You are currently on the free plan, upgrade to unlock more features!"
						: `You are currently subscribed to the ${user.subscription.plan} plan`}
				</LayoutSubtitle>
			</LayoutHeader>
			<div className="plan__list plans--3">
				{plans.map((plan: any, key: any) => (
					<Card key={key} title={plan.name}>
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
						{user.subscription.plan === plan.name &&
						user.subscription.plan !== "Free" &&
						user.subscription.status === "active" ? (
							<Button
								onClick={() =>
									modals.open({
										title: "Cancel subscription",
										onSubmit: cancelSubscription,
										body: (
											<p>
												Are you sure you want to cancel
												your subscription? You will lose
												access to all premium features.
											</p>
										),
										submitLabel: "Yes",
										closeLabel: "Cancel",
									})
								}
								variant="danger"
							>
								Cancel
							</Button>
						) : user.subscription.plan === plan.name &&
						  user.subscription.plan !== "Free" &&
						  user.subscription.status === "canceled" ? (
							<Button
								onClick={() =>
									modals.open({
										title: "Reactivate subscription",
										onSubmit: reactivateSubscription,
										body: (
											<p>
												Are you sure you want to
												reactivate your subscription?
											</p>
										),
										submitLabel: "Yes",
										closeLabel: "Cancel",
									})
								}
								variant="success"
							>
								Reactivate
							</Button>
						) : user.subscription.plan !== "Free" &&
						  plan.name === "Free" &&
						  user.subscription.status === "canceled" ? (
							<Button variant="disabled">
								Your {user.subscription.plan} subscription
								hasn't expired yet
							</Button>
						) : user.subscription.plan !== "Free" &&
						  plan.name === "Free" &&
						  user.subscription.status === "active" ? (
							<Button variant="disabled">
								Cancel your current subscription instead
							</Button>
						) : user.subscription.plan === "Free" &&
						  plan.name === "Free" ? (
							<Button
								variant="disabled"
							>
								Current
							</Button>
						) : user.subscription.status === "canceled" &&
						  plan.name !== "Free" ? (
							<Button variant="disabled">
								Reactivate your {plan.name} subscription
							</Button>
						) : (
							<Button
								onClick={() => handleCheckout(plan.price_id)}
							>
								{user.subscription.plan === "Free"
									? "Upgrade"
									: "Select"}
							</Button>
						)}
					</Card>
				))}
			</div>
		</LayoutMedium>
	);
};

export default Plans;
