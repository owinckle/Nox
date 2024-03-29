export const getSubdomain = (context) => {
	let host = context.req.headers.host;
	const subdomain = host.split('.')[0];

	const hasSubdomain = host.split('.').length > 2;
	const isSubdomain = hasSubdomain && subdomain !== 'www';
	return isSubdomain ? subdomain : null;
}

export const getCookie = (name) => {
	const nameEQ = name + "=";
	const cookies = document.cookie.split(';');

	for (let i = 0; i < cookies.length; i++) {
		let c = cookies[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length); // Trim leading whitespace

		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length); // Check for exact cookie name match
	}
	return null; // Return null if the cookie was not found
}