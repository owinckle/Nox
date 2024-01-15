import { useState } from "react";
import "./styles/auth.scss";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { Form, FormGroup } from "../components/Form";
import Button from "../components/Button";

const LoginPages = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { login, googleAuthHandler } = useAuth();

	const loginHandler = async (e?: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();

		try {
			await login(email, password);
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<div className="auth">
			<div className="auth-container">
				<div className="auth__pane auth-left">
					<div className="auth__title">
						Login to {import.meta.env.VITE_APP_NAME}
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
							<Link to="/register" className="accent">
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

export default LoginPages;
