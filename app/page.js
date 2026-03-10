import { fetchContent as fc } from '@/utils/cms/fetchContent';
import { buildPageMetadata as BPM } from '@/utils/seo/buildPageMetadata';
import { FETCH_HOME_PAGE_QUERY as Q } from '@/data/queries/pages/FETCH_HOME_PAGE_DATA';

import PageContainer from '@/components/animations/PageContainer';
import {
	AnimateFade,
	AnimateRight,
} from '@/components/animations/BaseAnimations';

import SubmitContactForm from '@/components/sections/contact/SubmitContactForm';

import ButtonLink from '@/components/ui/ButtonLink';
import {
	ParallaxColorSection,
	ParallaxSection,
} from '@/components/animations/ParallaxEffects';
import { Typography } from '@/components/design/Typography';
import ButtonPreviews from '@/components/design/ButtonPreviews';
import ColorPalette from '@/components/design/ColorPalette';
import SpacingScale from '@/components/design/SpacingScale';
import SanitySetup from '@/data/set-up/SanitySetup';
import SEOSetup from '@/data/set-up/SEOSetup';


export async function generateMetadata() {
  return await BPM({ slug: '/', query: Q })
}



export default async function Home() {
	const data = await fc(Q);

	
	
	return (
		<PageContainer>
			{/* <SanitySetup /> */}
			<SEOSetup />
			<AnimateFade className='max-w-3xl mx-auto grid place-items-center'>
				<ul className='space-y-0.5'>
					
					<li>
						Set color palette in <code>tailwind.config.js</code>
					</li>
					<li>
						Configure navigation in <code>data/navigationLinks.js</code>
					</li>
					<li>
						Choose fonts and update metadata in <code>layout.js</code>
					</li>
					<li>
						Replace logo in <code>/public/images/business-name</code>
					</li>
					<li>Review and update Privacy Policy</li>
					<li>Test contact form</li>
				</ul>
			</AnimateFade>
			<div className='mt-1 text-center space-y-0.5'>
				<div className='flex flex-col sm:flex-row justify-center items-center gap-1'>
					<ButtonLink href='/sitemap.xml' variant='dark-light'>
						View Sitemap Index
					</ButtonLink>
					<ButtonLink href='/sitemap-0.xml' variant='primary-light'>
						View Page URLs
					</ButtonLink>
					<ButtonLink href='/robots.txt' variant='light-dark'>
						View Robots.txt
					</ButtonLink>
				</div>
			</div>

			<Typography />
			<ColorPalette />
			<SpacingScale />
			<ButtonPreviews />
		</PageContainer>
	);
}


export const revalidate = 10;