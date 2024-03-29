import '@/styles/global.scss';
import '@/styles/auth.scss';
import '@/styles/button.scss';
import '@/styles/form.scss';
import "@/styles/onboarding.scss"
import "@/styles/dashboard.scss"
import "@/styles/sidebar.scss"
import "@/styles/home.scss"
import "@/styles/home-nav.scss"
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from '@/contexts/AuthContext';
import { CookiesProvider } from 'react-cookie';

export default function MyApp({ Component, pageProps }) {
	return (
		<CookiesProvider>
			<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
				<ToastContainer
					position="top-right"
					className="toast-container"
					theme="dark"
					autoClose={5000}
					draggable={false}
				/>
			</GoogleOAuthProvider>
		</CookiesProvider>
	);
}
