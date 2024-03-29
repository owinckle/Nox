function getCookie(name) {
	const cookies = document.cookie.split(';');
	const targetCookie = cookies.find(cookie => {
		const [key, value] = cookie.trim().split('=');
		return key === name;
	});
	return targetCookie ? decodeURIComponent(targetCookie.split('=')[1]) : '';
}

const useRequest = async (method, url, body = {}, errorCallback) => {
	const endpoint = `${import.meta.env.VITE_API_BASE_URL}${url}`;
	const response = await fetch(endpoint, {
		method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${getCookie("token")}`,
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