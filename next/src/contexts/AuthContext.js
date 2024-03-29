import React, { createContext, useState, useEffect } from "react";
// import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import useRequest, { usePublicRequest } from "../hooks/useRequest";
import { useGoogleLogin } from "@react-oauth/google";
const { useCookies } = require("react-cookie");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [closeLoader, setCloseLoader] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(["name"]);

	useEffect(() => {
		const token = cookies.token;
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
				removeCookie("token");
			});
	};

	const login = async (email, password) => {
		const loginErrorCallback = (response) => {
			toast.error("Invalid email or password.");
			throw new Error("Login failed with status: " + response.status);
		};

		usePublicRequest(
			"POST",
			"/auth/login/",
			{ email, password },
			loginErrorCallback
		)
			.then((data) => {
				if (process.env.NEXT_PUBLIC_ENV === "dev") {
					setCookie("token", data.token, { domain: ".test.com" });
				} else {
					setCookie("token", data.token, { domain: `.` + process.env.NEXT_PUBLIC_APP_DOMAIN });
				}
				setUser(data.user);
			})
			.catch((error) => {
				console.error("Login error:", error);
				// Consider how you might surface these errors in your UI
			});
	};

	const logout = () => {
		removeCookie("token");
		setUser(null);
	};

	const register = async (name, email, password) => {
		const registerErrorCallback = (response) => {
			toast.error("Something happened while creating your account.");
			throw new Error(
				"Registration failed with status: " + response.status
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
				if (process.env.NEXT_PUBLIC_ENV === "dev") {
					setCookie("token", data.token, { domain: ".test.com" });
				} else {
					setCookie("token", data.token, { domain: `.` + process.env.NEXT_PUBLIC_APP_DOMAIN });
				}
			})
			.catch((error) => {
				console.error("Registration error:", error);
				// Consider how you might surface these errors in your UI
			});
	};

	const updateProfile = async (name, email, newPassword, currentPassword) => {
		const updateErrorCallback = () => {
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
				if (process.env.NEXT_PUBLIC_ENV === "dev") {
					setCookie("token", data.token, { domain: ".test.com" });
				} else {
					setCookie("token", data.token, { domain: `.` + process.env.NEXT_PUBLIC_APP_DOMAIN });
				}
				setUser(data.user);
			});
		},
	});

	if (loading) {
		// return (
		// 	<Loader
		// 		logo="https://i.gyazo.com/047076012ad802f9e016fc92ac439ad7.png"
		// 		closing={closeLoader}
		// 	/>
		// );
		return <div>Loading...</div>;
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
