import { Analytics } from '@vercel/analytics/next';
import { draftMode } from 'next/headers';
import VisualEditingClient from '@/components/ui/VisualEditingClient';

import Footer from '@/components/layout/navigation/Footer';
import { mainLayoutMetadata } from '@/lib/seo/mainLayoutMetadata';
import NavigationContainer from '@/components/layout/navigation/NavigationContainer';
import './globals.css';
import { Fustat, Open_Sans } from 'next/font/google';

const fustat = Fustat({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	display: 'swap',
	variable: '--font-fustat',
});

const openSans = Open_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
	display: 'swap',
	variable: '--font-open-sans',
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

export default async function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`min-h-screen ${fustat.variable} ${openSans.variable}`}>
				<NavigationContainer />
				{children}
				<Analytics />
				<Footer />
				{(await draftMode()).isEnabled && <VisualEditingClient />}
			</body>
		</html>
	);
}
