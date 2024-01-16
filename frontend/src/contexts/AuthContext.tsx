import React, { createContext, useState, useEffect, ReactNode } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import useRequest, { usePublicRequest } from "../hooks/useRequest";
import { useGoogleLogin } from "@react-oauth/google";

type AuthContextType = {
	isAuthenticated: boolean;
	user: any;
	getProfile: () => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	register: (name: string, email: string, password: string) => Promise<void>;
	updateProfile: (
		name: string,
		email: string,
		newPassword: string,
		password: string
	) => Promise<void>;
	googleAuthHandler: () => void;
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
		useRequest("GET", "/auth/profile/", null)
			.then((data) => {
				setUser(data);
				if (loading) {
					setCloseLoader(true);
					setTimeout(() => setLoading(false), 300);
				}
			})
			.catch((error) => {
				console.error("Login error:", error);
				localStorage.removeItem("token");
			});
	};

	const login = async (email: string, password: string) => {
		const loginErrorCallback = (repsonse: Response) => {
			toast.error("Invalid email or password.");
			throw new Error("Login failed with status: " + repsonse.status);
		};

		usePublicRequest(
			"POST",
			"/auth/login/",
			{ email, password },
			loginErrorCallback
		)
			.then((data) => {
				localStorage.setItem("token", data.token);
				setUser(data.user);
			})
			.catch((error) => {
				console.error("Login error:", error);
				// Consider how you might surface these errors in your UI
			});
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	const register = async (name: string, email: string, password: string) => {
		const registerErrorCallback = (repsonse: Response) => {
			toast.error("Something happened while creating your account.");
			throw new Error(
				"Registration failed with status: " + repsonse.status
			);
		};

		usePublicRequest(
			"POST",
			"/auth/register/",
			{ name, email, password },
			registerErrorCallback
		)
			.then((data) => {
				setUser(data.user);
				localStorage.setItem("token", data.token);
			})
			.catch((error) => {
				console.error("Registration error:", error);
				// Consider how you might surface these errors in your UI
			});
	};

	const updateProfile = async (
		name: string,
		email: string,
		newPassword: string,
		currentPassword: string
	) => {
		const updateErrorCallback = (repsonse: Response) => {
			if (repsonse.status === 400) {
				toast.error("Your password is incorrect.");
			} else {
				toast.error("Something happened while updating your profile.");
			}
			throw new Error("Update failed with status: " + repsonse.status);
		};

		useRequest(
			"PUT",
			"/auth/profile/",
			{
				name,
				email,
				new_password: newPassword,
				current_password: currentPassword,
			},
			updateErrorCallback
		)
			.then((user) => {
				toast.success("Profile updated successfully.");
				setUser(user);
			})
			.catch((error) => {
				console.error("Profile update error:", error);
			});
	};

	const googleAuthHandler = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			await usePublicRequest("POST", "/auth/google/", {
				access_token: tokenResponse.access_token,
			}).then((data) => {
				setUser(data.user);
				localStorage.setItem("token", data.token);
			});
		},
	});

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
				getProfile,
				login,
				logout,
				register,
				googleAuthHandler,
				updateProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
