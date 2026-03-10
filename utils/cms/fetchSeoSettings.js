// utils/cms/fetchSeoSettings.js

import { sanityClient } from '@/utils/cms/sanityConnection';
import { FETCH_SEO_SETTINGS_QUERY } from '@/data/queries/seo/FETCH_SEO_SETTINGS_QUERY';

export async function fetchSeoSettings() {
	return sanityClient.fetch(
		FETCH_SEO_SETTINGS_QUERY,
		{},
		// { next: { revalidate: 3600 } }, // 1 hour cache — SEO settings rarely change
		{ next: { revalidate: 10 } }, // 10 seconds cache — for development purposes
	);
}
