import Head from 'next/head';

const AppHead = ({ title }) => {
	return (
		<Head>
			<title>{process.env.NEXT_PUBLIC_APP_NAME} {title && " | " + title}</title>
		</Head>
	);
}

export default AppHead;