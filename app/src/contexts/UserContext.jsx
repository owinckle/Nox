import { createContext, useEffect, useState } from "react";
import { ProfilePopup } from "../components/ProfilePopup";
import useRequest, { usePublicRequest } from "../hooks/useRequest";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useGoogleLogin } from "@react-oauth/google";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(["name"]);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	// Initial load
	useEffect(() => {
		const token = cookies.token;
		if (token) {
			getProfile();
		} else {
			setLoading(false);
		}
	}, []);

	// User
	const login = async (email, password) => {
		const loginErrorCallback = (repsonse) => {
			toast.error("Invalid credentials.");
			throw new Error("Login failed with status: " + repsonse.status);
		};

		usePublicRequest(
			"POST",
			"/auth/login/",
			{ email, password },
			loginErrorCallback
		)
			.then((data) => {
				if (import.meta.env.VITE_ENV === "dev") {
					setCookie("token", data.token, {
						domain: ".test.com",
						maxAge: 2147483647,
					});
				} else {
					setCookie("token", data.token, {
						domain: `.` + import.meta.env.VITE_APP_DOMAIN,
						maxAge: 2147483647,
					});
				}
				setUser(data.user);
			})
			.catch((error) => {
				console.error("Login error:", error);
				// Consider how you might surface these errors in your UI
			});
	};

	const logout = () => {
		if (import.meta.env.VITE_ENV === "dev") {
			removeCookie("token", { domain: ".test.com" });
		} else {
			removeCookie("token", {
				domain: `.` + import.meta.env.VITE_APP_DOMAIN,
			});
		}
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
				if (import.meta.env.VITE_ENV === "dev") {
					setCookie("token", data.token, {
						domain: ".test.com",
						maxAge: 2147483647,
					});
				} else {
					setCookie("token", data.token, {
						domain: `.` + import.meta.env.VITE_APP_DOMAIN,
						maxAge: 2147483647,
					});
				}
			})
			.catch((error) => {
				console.error("Registration error:", error);
				// Consider how you might surface these errors in your UI
			});
	};

	const googleAuthHandler = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			await usePublicRequest("POST", "/auth/google/", {
				access_token: tokenResponse.access_token,
			}).then((data) => {
				if (import.meta.env.VITE_ENV === "dev") {
					setCookie("token", data.token, {
						domain: ".test.com",
						maxAge: 2147483647,
					});
				} else {
					setCookie("token", data.token, {
						domain: `.` + import.meta.env.VITE_APP_DOMAIN,
						maxAge: 2147483647,
					});
				}
				setUser(data.user);
			});
		},
	});

	const getProfile = async () => {
		useRequest("GET", "/auth/profile/", null)
			.then((data) => {
				setUser(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Login error:", error);
				if (import.meta.env.VITE_ENV === "dev") {
					removeCookie("token", { domain: ".test.com" });
				} else {
					removeCookie("token", {
						domain: `.` + import.meta.env.VITE_APP_DOMAIN,
					});
				}
			});
	};

	// All profiles
	const [profile, setProfile] = useState(null);
	const openProfile = (user) => {
		setProfile(user);
	};

	const closeProfile = () => {
		setProfile(null);
	};

	return (
		<UserContext.Provider
			value={{
				loading,
				user,
				login,
				googleAuthHandler,
				register,
				logout,
				openProfile,
			}}
		>
			{children}

			{profile && (
				<ProfilePopup
					title={`${profile.name}'s Profile`}
					profile={profile}
					onClose={closeProfile}
				/>
			)}
		</UserContext.Provider>
	);
};

export default UserContext;
