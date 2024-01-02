import React, { createContext, useState, useEffect, ReactNode } from "react";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";

type AuthContextType = {
	isAuthenticated: boolean;
	user: any;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	register: (email: string, password: string) => Promise<void>;
	updateProfile: (
		email: string,
		newPassword: string,
		password: string
	) => Promise<void>;
};

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [closeLoader, setCloseLoader] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token && !user) {
			getProfile();
		} else {
			setCloseLoader(true);
			setTimeout(() => setLoading(false), 300);
		}
	}, [user]);

	const getProfile = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/auth/profile/`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Login failed with status: " + response.status);
			}

			const data = await response.json();
			setUser({ email: data.email, plan: data.current_plan });
			if (loading) {
				setCloseLoader(true);
				setTimeout(() => setLoading(false), 300);
			}
		} catch (error) {
			console.error("Login error:", error);
			localStorage.removeItem("token");
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/auth/login/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (!response.ok) {
				toast.error("Invalid email or password.");
				throw new Error("Login failed with status: " + response.status);
			}

			const data = await response.json();
			localStorage.setItem("token", data.token);
			setUser({ email: data.email, plan: data.plan });
		} catch (error) {
			console.error("Login error:", error);
			// Consider how you might surface these errors in your UI
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	const register = async (email: string, password: string) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/auth/register/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (!response.ok) {
				toast.error("Something happened while creating your account.");
				throw new Error(
					"Registration failed with status: " + response.status
				);
			}

			window.location.href = "/login";
		} catch (error) {
			console.error("Registration error:", error);
		}
	};

	const updateProfile = async (
		email: string,
		newPassword: string,
		currentPassword: string
	) => {
		fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/profile/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({
				email,
				new_password: newPassword,
				current_password: currentPassword,
			}),
		});

		await getProfile();
	};

	if (loading) {
		return (
			<Loader
				logo="https://i.gyazo.com/047076012ad802f9e016fc92ac439ad7.png"
				closing={closeLoader}
			/>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: !!user,
				user,
				login,
				logout,
				register,
				updateProfile,
			}}
		>
			{children}
			<ToastContainer
				position="top-right"
				className="toast-container"
				theme="dark"
				autoClose={5000}
				draggable={false}
			/>
		</AuthContext.Provider>
	);
};

export default AuthContext;
