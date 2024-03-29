import { useEffect, useState } from "react";
import { BoardList } from "../../components/Boards";
import { MainTitle } from "../../components/Layout";
import useRequest from "../../hooks/useRequest";

const FeatureRequests = () => {
	const [posts, setPosts] = useState([]);

	const getBoard = async () => {
		useRequest("POST", "/board/feature-requests/get/", {
			space_slug: window.location.hostname.split(".")[0],
		}).then((data) => {
			setPosts(data);
		});
	};

	useEffect(() => {
		getBoard();
	}, []);

	return (
		<>
			<MainTitle>Feature Requests</MainTitle>

			<BoardList posts={posts} />
		</>
	);
};

export default FeatureRequests;
