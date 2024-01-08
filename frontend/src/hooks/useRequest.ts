function getCookie(name: string) {
	const cookies = document.cookie.split(";");
	const cookie = cookies.find((c) => c.includes(name));
	return cookie ? cookie.split("=")[1] : "";
}

type bodyType = {} | null;
type methodType = "GET" | "POST" | "PUT" | "DELETE";

const useRequest = async (method: methodType, url: string, body: bodyType | null, errorCallback?: (response: Response) => void) => {
	const endpoint = `${import.meta.env.VITE_API_BASE_URL}${url}`;
	const response = await fetch(endpoint, {
		method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${localStorage.getItem("token")}`,
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

export const usePublicRequest = async (method: methodType, url: string, body: bodyType | null, errorCallback?: (response: Response) => void) => {
	const endpoint = `${import.meta.env.VITE_API_BASE_URL}${url}`;
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