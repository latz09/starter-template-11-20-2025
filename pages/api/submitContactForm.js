// /pages/api/submitContactForm.js
import { sanityClient } from '@/utils/cms/sanityConnection';
import { EmailTemplateBuilder } from '@/utils/client-config/emailTemplateBuilder';
import { clientConfig } from '@/utils/client-config/clientConfig';
import transporter from '@/utils/nodemailer/transporter';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	// Validate required fields dynamically based on clientConfig
	const requiredFields = clientConfig.formFields.filter(f => f.required);
	const missingFields = requiredFields.filter(f => !req.body[f.name]);
	
	if (missingFields.length > 0) {
		return res.status(400).json({
			success: false,
			message: `Missing required fields: ${missingFields.map(f => f.label).join(', ')}`,
		});
	}

	// Build form data with defaults for optional fields
	const formData = {};
	clientConfig.formFields.forEach(field => { 
		formData[field.name] = req.body[field.name] || 'Not provided';
	});

	// Generate emails using the new template builder
	const emailBuilder = new EmailTemplateBuilder(clientConfig);
	const clientEmail = emailBuilder.buildClientEmail(formData);
	const autoResponse = emailBuilder.buildAutoResponse(formData);

	// Send emails concurrently
	const emailPromise = Promise.all([
		transporter.sendMail(clientEmail),
		transporter.sendMail(autoResponse),
	]).catch((error) => {
		console.error('Error sending emails:', error);
	});

	// Store in Sanity
	let sanityResult = null;
	try {
		sanityResult = await sanityClient.create({
			_type: 'submittedContactForm', // Make sure this matches your Sanity schema
			...formData,
			sentAt: new Date().toISOString(),
		});
	} catch (sanityError) {
		console.error('Error storing data in Sanity:', sanityError);
	}

	// Wait for emails to finish
	await emailPromise;

	return res.status(200).json({
		success: true,
		message: sanityResult 
			? 'Form submitted successfully' 
			: 'Form submitted successfully, but encountered an error storing data.',
		data: sanityResult,
	});
}