import "./styles/auth.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Form, FormGroup } from "../components/Form";

const RegisterPage = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { register } = useAuth();

	const registerHandler = async (e?: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();

		try {
			await register(email, password);
		} catch (error) {
			console.error("Register error:", error);
		}
	};

	return (
		<div className="auth">
			<div className="auth-container">
				<div className="auth__pane auth-left">
					<div className="auth__title">Welcome to Nox</div>
					<div className="auth__subtitle">
						Lore ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt.
					</div>

					<Form onSubmit={registerHandler} submitLabel="Sign up">
						<FormGroup
							label="E-mail"
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<FormGroup
							type="password"
							placeholder="••••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							label="Password"
						/>
					</Form>

					<div className="auth__links">
						<div className="auth__link">Forgot password?</div>
						<div className="auth__link">
							Already have an account?{" "}
							<Link to="/login" className="accent">
								Log in
							</Link>
						</div>
					</div>
				</div>
				<div className="auth__pane auth-right"></div>
			</div>
		</div>
	);
};

export default RegisterPage;
