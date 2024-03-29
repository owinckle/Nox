import { useState, useEffect } from "react";
import useRequest from "../hooks/useRequest";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import Head from "@/components/HTML/Head";

const App = ({ spaceName }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { isAuthenticated } = useAuth();

	const getSpace = () => {
		const errorCallback = (response) => {
			console.error(response);
		};

		const data = useRequest("POST", "/space/get/", {}, errorCallback).then(
			(data) => {
				console.log(data);
			}
		);
	};

	useEffect(() => {
		// getSpace();
		if (!isAuthenticated) {
			router.push(
				`${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_DOMAIN}/login`
			);
		}

		setLoading(false);
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<Head title={spaceName} />
			<div className="app">APP</div>
		</>
	);
};

export default App;
