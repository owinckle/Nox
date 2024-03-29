import Home from "@/views/Home";
import App from "@/views/App";
import { getSubdomain } from "@/utils";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
	return {
		props: {
			subdomain: getSubdomain(context),
		},
	};
}

export default function Main({ subdomain }) {
	const router = useRouter();
	const { isAuthenticated, user } = useAuth();

	console.log(subdomain);

	if (subdomain && isAuthenticated && !user.onboarding_complete) {
		router.push(
			`${process.env.NEXT_PUBLIC_APP_PROTOCOL}://app.${process.env.NEXT_PUBLIC_APP_DOMAIN}/onboarding`
		);
	}

	return subdomain ? <App spaceName={subdomain} /> : <Home />;
}
