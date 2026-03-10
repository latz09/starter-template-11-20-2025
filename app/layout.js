import { Analytics } from '@vercel/analytics/next';
import { draftMode } from 'next/headers';
import VisualEditingClient from '@/components/ui/VisualEditingClient';

import Footer from '@/components/layout/navigation/Footer';
import { fetchSeoSettings } from '@/utils/cms/fetchSeoSettings';
import { buildOrganizationSchema } from '@/lib/seo/buildOrganizationSchema';
import JsonLd from '@/components/seo/JsonLd';
import NavigationContainer from '@/components/layout/navigation/NavigationContainer';
import './globals.css';
import { Fustat, Open_Sans } from 'next/font/google';
import DesignSystemBadge from '@/components/design/DesignSystemBadge';

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

export async function generateMetadata() {
	const seo = await fetchSeoSettings();
	if (!seo) return {}  

	return {
		metadataBase: new URL(seo.siteUrl),
		applicationName: seo.siteName,
		title: {
			default: seo.defaultTitle,
			template: seo.titleTemplate,
		},
		description: seo.defaultDescription,
		keywords: seo.keywords,
		icons: { icon: '/favicon.ico' },
		openGraph: {
			title: seo.defaultTitle,
			description: seo.defaultDescription,
			url: seo.siteUrl,
			siteName: seo.siteName,
			images: [{ url: seo.ogImage, width: 1200, height: 630 }],
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: seo.defaultTitle,
			description: seo.defaultDescription,
			...(seo.twitterHandle && { creator: seo.twitterHandle }),
			images: [seo.ogImage],
		},
	};
}

export default async function RootLayout({ children }) {
	const seo = await fetchSeoSettings(); // same cached call — no extra Sanity hit
	const schema = buildOrganizationSchema(seo);

	return (
		<html lang='en'>
			<body className={`min-h-screen ${fustat.variable} ${openSans.variable}`}>
				{schema && <JsonLd data={schema} />}
				<NavigationContainer />
				{children}
				<Analytics />
				<Footer />
				   <DesignSystemBadge /> 
				{(await draftMode()).isEnabled && <VisualEditingClient />}
			</body>
		</html>
	);
}
