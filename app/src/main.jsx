import React from "react";
import ReactDOM from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";
import "./styles/global.scss";

import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./contexts/UserContext";
import Dispatcher from "./Dispatcher";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<UserProvider>
				<Router>
					<Dispatcher />
				</Router>
			</UserProvider>
		</GoogleOAuthProvider>

		<ToastContainer
			position="top-right"
			className="toast-container"
			theme="dark"
			autoClose={5000}
			draggable={false}
		/>
	</React.StrictMode>
);
