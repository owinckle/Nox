import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ModalsProvider } from "./contexts/ModalsContext.tsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ModalsProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ModalsProvider>
		<ToastContainer
			position="top-right"
			className="toast-container"
			theme="dark"
			autoClose={5000}
			draggable={false}
		/>
	</React.StrictMode>
);
