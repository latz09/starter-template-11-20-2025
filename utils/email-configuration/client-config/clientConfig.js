// /utils/client-configuration/clientConfig.js
export const clientConfig = {
	branding: {
		name: 'CLIENT_NAME', 
		logoUrl: 'https://cdn.sanity.io/images/9yfxmlzk/production/................................', // Replace with actual logo
		colors: {
			headerBackground: '#FFFDF9',
			bodyBackground: '#FFFDF9',
			detailsBoxBackground: '#E7F8FF',
			descriptionBackground: '#FFFDF9',
			descriptionBorderLeft: '#3C084D', // Blue accent - customize per client
			footerBackground: '#FFFDF9', // Dark footer
			footerText: '#3C084D',
			textPrimary: '#111827',
			textMuted: '#6B7280',
		},
		contactInfo: {
			phone: '', // Replace with client's actual phone
			email: process.env.CLIENT_EMAIL, // Or hardcode if needed
		},
	},
	formFields: [
		{ name: 'name', label: 'Name', required: true, type: 'text' },
		{ name: 'email', label: 'Email', required: true, type: 'email' },
		{ name: 'phoneNumber', label: 'Phone Number', required: true, type: 'tel' },
		{ name: 'message', label: 'How can we help?', required: false, type: 'textarea' },
	],
	messaging: {
		clientEmailSubject: (name) => `New Email from ${name}`,
		autoResponseSubject: (name) => `${name}, We Received Your Request`,
		autoResponseGreeting: (name) => `Thanks for Your  Request, ${name}!`,
		autoResponseBody: 
			"We've received your  request and will be in touch within 24 hours to confirm your booking.",
		autoResponseClosing: 'Our Team at CLIENT_NAME', // Replace with client name
	},
};