import Button from "@/components/Button";
import AppHead from "@/components/HTML/Head";
import Image from "next/image";

const Home = () => {
	return (
		<>
			<AppHead />

			<main>
				<nav>
					<div class="nav__container">
						<div class="nav__left">
							<a class="nav__identity" href="/">
								<Image
									className="nav__logo"
									src="/logo.png"
									alt="Logo"
									width={30}
									height={30}
								/>
								<div class="nav__title">
									{process.env.NEXT_PUBLIC_APP_NAME}
								</div>
							</a>
							<ul class="nav__links">
								<li class="nav__link">
									<a href="{% url 'pages-home' %}#features">
										Features
									</a>
								</li>
								<li class="nav__link">
									<a href="{% url 'pages-home' %}#pricing">
										Pricing
									</a>
								</li>
								<li class="nav__link">
									<a href="{% url 'pages-home' %}#faq">FAQ</a>
								</li>
							</ul>
						</div>
						<div class="nav__right">
							<ul class="nav__links">
								<li class="nav__like">
									<a href="/login">
										<Button variant="reverse">Login</Button>
									</a>
								</li>
								<li class="nav__link">
									<a href="/register">
										<Button>Sign Up</Button>
									</a>
								</li>
							</ul>
						</div>

						<div class="nav__burger">
							<div class="nav__burger__line"></div>
							<div class="nav__burger__line"></div>
							<div class="nav__burger__line"></div>
						</div>
					</div>
				</nav>

				<section class="hero fade-in-up">
					<span class="hero__notice">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</span>
					<h2 class="hero__title">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</h2>
					<h1 class="hero__description">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quisquam, voluptatum.
					</h1>

					<div class="hero__ctas">
						<Button>Get Started</Button>
						<Button>Features</Button>
					</div>
				</section>
			</main>
		</>
	);
};

export default Home;
