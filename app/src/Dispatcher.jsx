import Landing from "./views/landing";
import App from "./views/app";
import PublicSpace from "./views/public-space";
import PrivateSpace from "./views/private-space";

const Dispatcher = () => {
	const host = window.location.hostname;
	const parts = host.split(".");
	if (parts.length == 2) {
		return <Landing />;
	} else if (parts.length == 3) {
		if (parts[0] == "app") {
			return <App />;
		} else {
			const params = window.location.pathname.split("/");
			if (params.length > 1 && params[1] == "admin") {
				return <PrivateSpace />;
			} else {
				return <PublicSpace />;
			}
		}
	}
};

export default Dispatcher;
