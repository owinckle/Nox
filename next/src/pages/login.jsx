import { useEffect, useState } from "react";
import { Form, FormGroup } from "@/components/Form";
import Button from "@/components/Button";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

const Login = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, googleAuthHandler, isAuthenticated } = useAuth();

	const loginHandler = async (e) => {
		e.preventDefault();

		try {
			await login(email, password);
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.push(
				`${process.env.NEXT_PUBLIC_APP_PROTOCOL}://app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
			);
		}
	}, [isAuthenticated]);

	return (
		<div className="auth">
			<div className="auth-container">
				<div className="auth__pane auth-left">
					<div className="auth__title">
						Login to {process.env.NEXT_PUBLIC_APP_NAME}
					</div>
					<div className="auth__subtitle">
						Lore ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt.
					</div>

					<div className="auth__socials">
						<Button onClick={googleAuthHandler}>
							Continue with Google
						</Button>
					</div>

					<div className="auth__seperator">
						<div className="auth__seperator__line"></div>
						<div className="auth__separator__text">
							or continue with
						</div>
						<div className="auth__seperator__line"></div>
					</div>

					<Form onSubmit={loginHandler} submitLabel="Login">
						<FormGroup
							label="E-mail"
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoFocus
						/>
						<FormGroup
							label="Password"
							type="password"
							placeholder="••••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form>

					<div className="auth__links">
						<div className="auth__link">Forgot password?</div>
						<div className="auth__link">
							Don't have an account?{" "}
							<Link href="/register" className="accent">
								Sign up
							</Link>
						</div>
					</div>
				</div>
				<div className="auth__pane auth-right"></div>
			</div>
		</div>
	);
};

export default Login;
