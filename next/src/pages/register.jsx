import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { Form, FormGroup } from "@/components/Form";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

const Register = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const { register, googleAuthHandler, isAuthenticated } = useAuth();

	const registerHandler = async (e) => {
		e?.preventDefault();

		try {
			await register(name, email, password);
		} catch (error) {
			console.error("Register error:", error);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/app");
		}
	}, []);

	return (
		<div className="auth">
			<div className="auth-container">
				<div className="auth__pane auth-left">
					<div className="auth__title">
						Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
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

					<Form onSubmit={registerHandler} submitLabel="Sign up">
						<FormGroup
							label="Name"
							type="text"
							placeholder="Enter your name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoFocus
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
							<Link href="/login" className="accent">
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

export default Register;
