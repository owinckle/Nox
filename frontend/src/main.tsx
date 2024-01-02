import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ModalsProvider } from "./contexts/ModalsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ModalsProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ModalsProvider>
	</React.StrictMode>
);
