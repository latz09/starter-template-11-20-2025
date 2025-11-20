import { sanityClient } from './sanityConnection';

export async function fetchContent(query) {
	try {
		const data = await sanityClient.fetch(query);
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw new Error('Failed to fetch data');
	}
}
