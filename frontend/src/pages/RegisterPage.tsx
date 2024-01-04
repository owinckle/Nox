import "./styles/auth.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Form, FormGroup } from "../components/Form";

const RegisterPage = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [name, setName] = useState<string>("");
	const { register } = useAuth();

	const registerHandler = async (e?: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();

		try {
			await register(name, email, password);
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
							label="Name"
							type="text"
							placeholder="Enter your name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<FormGroup
							label="E-mail"
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
