import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { Form, FormGroup } from "../../components/Form";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Register = () => {
	const { user, register, googleAuthHandler } = useUser();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (user) {
			const host = window.location.host;
			const protocol = window.location.protocol;
			window.location.href = `${protocol}//app.${host}`;
		}
	}, [user]);

	const registerHandler = async () => {
		try {
			await register(name, email, password);
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
				<div className="auth__modal__title">
					Create a UserEcho account
				</div>
				<div className="auth__modal__subtitle">
					Lore ipsum dolor sit amet, consectetur adipiscing elit.
				</div>
				<div className="auth__modal__socials">
					<Button onClick={googleAuthHandler}>
						Continue with Google
					</Button>
				</div>
				<div className="auth__modal__separator">
					<div className="auth__modal__separator__line"></div>
					<div className="auth__modal__separator__text">
						or register with
					</div>
					<div className="auth__modal__separator__line"></div>
				</div>
				<Form submitLabel="Register" onSubmit={registerHandler}>
					<FormGroup
						label="Name"
						type="text"
						placeholder="John"
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoFocus
					/>
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
					<Link to="/login" className="auth__modal__links__link">
						Already have an account? Login instead
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
