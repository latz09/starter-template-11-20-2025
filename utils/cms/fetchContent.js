import { sanityClient } from './sanityConnection';
import { draftMode } from 'next/headers';

export async function fetchContent(query, params = {}) {
    try {
        const draft = await draftMode();
        const isDraftMode = draft.isEnabled;

        const data = await sanityClient.fetch(query, params, {
            perspective: isDraftMode ? 'drafts' : 'published',
            next: { revalidate: isDraftMode ? 0 : 10 },
        });

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
}