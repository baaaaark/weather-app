import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
		<Html>
			<Head>
				{/* Favicon */}
				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
		);
	}
}

export default MyDocument;
