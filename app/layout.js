import { Analytics } from '@vercel/analytics/next';

import Footer from '@/components/layout/navigation/Footer';
import { mainLayoutMetadata } from '@/lib/seo/mainLayoutMetadata';
import NavigationContainer from '@/components/layout/navigation/NavigationContainer';
import './globals.css';
import { Barlow_Semi_Condensed } from 'next/font/google';

const barlow = Barlow_Semi_Condensed({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	display: 'swap',
	variable: '--font-barlow',
});

export const metadata = {
	metadataBase: new URL(mainLayoutMetadata.siteUrl),
	applicationName: mainLayoutMetadata.name,
	title: {
		default: mainLayoutMetadata.title,
		template: mainLayoutMetadata.titleTemplate,
	},
	description: mainLayoutMetadata.description,
	keywords: mainLayoutMetadata.keywords,
	icons: {
		icon: mainLayoutMetadata.favicon,
	},
	openGraph: {
		title: mainLayoutMetadata.title,
		description: mainLayoutMetadata.description,
		url: mainLayoutMetadata.siteUrl,
		siteName: mainLayoutMetadata.name,
		images: [
			{
				url: mainLayoutMetadata.ogImage,
				width: 1200,
				height: 630,
			},
		],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: mainLayoutMetadata.title,
		description: mainLayoutMetadata.description,
		creator: mainLayoutMetadata.twitterHandle,
		images: [mainLayoutMetadata.ogImage],
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`min-h-screen  ${barlow.variable} `}>
				<NavigationContainer />
				{children}
				<Analytics />
				<Footer />
			</body>
		</html>
	);
}
