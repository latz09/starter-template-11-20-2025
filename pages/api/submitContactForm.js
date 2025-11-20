// /pages/api/submitContactForm.js
import { sanityClient } from '@/utils/cms/sanityConnection';
import { generateAutomaticResponse } from '@/utils/email-configuration/generateAutomaticResponse';
import { generateClientEmail } from '@/utils/email-configuration/generateClientEmail';
import transporter from '@/utils/nodemailer/transporter';

export default async function handler(req, res) {
	// Validate HTTP method
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	// Validate required fields (only name and email are required)
	const { name, email, phoneNumber, description } = req.body;
	if (!name || !email) {
		return res.status(400).json({
			success: false,
			message: 'Missing required fields: name and email are required.',
		});
	}

	// Use default values if phoneNumber or description are missing
	const finalPhoneNumber = phoneNumber || 'Not provided';
	const finalDescription = description || 'Not provided';

	// Prepare email options for client notification and automatic response
	const clientMailOptions = generateClientEmail({
		name,
		email,
		phoneNumber: finalPhoneNumber,
		description: finalDescription,
	});
	const autoEmailOptions = generateAutomaticResponse({
		name,
		email,
		phoneNumber: finalPhoneNumber,
		description: finalDescription,
	});

	// Initiate email sending concurrently
	const emailPromise = Promise.all([
		transporter.sendMail(clientMailOptions),
		transporter.sendMail(autoEmailOptions),
	]).catch((error) => {
		console.error('Error sending emails:', error);
	});

	// Process the Sanity data storage separately so emails run regardless
	let sanityResult = null;
	try {
		sanityResult = await sanityClient.create({
			_type: 'contactForm',
			name,
			email,
			phoneNumber: finalPhoneNumber,
			description: finalDescription,
			sentAt: new Date().toISOString(),
		});
	} catch (sanityError) {
		console.error('Error storing data in Sanity:', sanityError);
		// Continue execution even if Sanity fails
	}

	// Wait for the email sending to complete
	try {
		await emailPromise;
	} catch (emailError) {
		console.error('Error in email sending process:', emailError);
	}

	// Return a response; note that even if Sanity fails, emails have been sent.
	if (!sanityResult) {
		return res.status(200).json({
			success: true,
			message:
				'Form submitted successfully, but encountered an error storing data.',
			data: null,
		});
	}
	return res.status(200).json({
		success: true,
		message: 'Form submitted successfully',
		data: sanityResult,
	});
}
