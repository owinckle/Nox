// function getCookie(name) {
// 	const cookies = document.cookie.split(";");
// 	const cookie = cookies.find((c) => c.includes(name));
// 	return cookie ? cookie.split("=")[1] : "";
// }

import { getCookie } from "@/utils";

const useRequest = async (method, url, body, errorCallback) => {
	const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
	const token = getCookie("token");
	const response = await fetch(endpoint, {
		method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
			"X-Csrftoken": getCookie("csrftoken"),
		},
		body: method !== "GET" ? JSON.stringify(body) : null,
	});

	if (!response.ok) {
		if (errorCallback) {
			errorCallback(response);
		} else {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
	}

	return await response.json();
};

export default useRequest;

export const usePublicRequest = async (method, url, body, errorCallback) => {
	const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
	const response = await fetch(endpoint, {
		method,
		headers: {
			"Content-Type": "application/json",
			"X-Csrftoken": getCookie("csrftoken"),
		},
		body: method !== "GET" ? JSON.stringify(body) : null,
	});

	if (!response.ok) {
		if (errorCallback) {
			errorCallback(response);
		} else {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
	}

	return await response.json();
}