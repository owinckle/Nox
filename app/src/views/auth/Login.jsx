import "./styles.scss";
import Button from "../../components/Button";
import { Form, FormGroup } from "../../components/Form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user, login, googleAuthHandler } = useUser();

	useEffect(() => {
		if (user) {
			const host = window.location.host;
			const protocol = window.location.protocol;
			window.location.href = `${protocol}//app.${host}`;
		}
	}, [user]);

	const loginHandler = async () => {
		try {
			await login(email, password);
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<div className="auth">
			<div className="auth__header">
				<a href="/" className="auth__header__site">
					UserEcho
				</a>
			</div>

			<div className="auth__modal">
				<div className="auth__modal__title">Login to UserEcho</div>
				<div className="auth__modal__subtitle">
					Lore ipsum dolor sit amet, consectetur adipiscing elit.
				</div>
				<div className="auth__modal__socials">
					<Button onClick={googleAuthHandler}>
						Login with Google
					</Button>
				</div>
				<div className="auth__modal__separator">
					<div className="auth__modal__separator__line"></div>
					<div className="auth__modal__separator__text">
						or continue with
					</div>
					<div className="auth__modal__separator__line"></div>
				</div>
				<Form submitLabel="Login" onSubmit={loginHandler}>
					<FormGroup
						label="E-mail"
						type="email"
						placeholder="john@domain.com"
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
						autoFocus
					/>
				</Form>

				<div className="auth__modal__links">
					<Link to="/register" className="auth__modal__links__link">
						Don't have an account? Sign up instead
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
