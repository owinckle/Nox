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
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
