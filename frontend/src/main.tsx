import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ModalsProvider } from "./contexts/ModalsContext.tsx";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId="861110664549-uebriobrh8pqfv2is25g0chv6e5p5hi5.apps.googleusercontent.com">
			<ModalsProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</ModalsProvider>
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
