import SubmitContactForm from '@/components/sections/contact/SubmitContactForm';
import { page4Metadata } from '@/lib/seo/pageMetadata';

export const metadata = page4Metadata;
const ContactPage = () => {
	return (
		<div className=' grid '>
			<div>
				<SubmitContactForm />
			</div>
		</div>
	);
};

export default ContactPage;
