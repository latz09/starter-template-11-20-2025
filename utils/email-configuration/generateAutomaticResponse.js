export const generateAutomaticResponse = ({
	name,
	email,
	phoneNumber,
	description,
}) => {
	const logoUrl =
		'https://cdn.sanity.io/images/tycc011s/production/3b634ec29b30a701ea4634ba72d79ce06768ef61-3958x1306.png';

	// Define basic styling variables (update these for different clients)
	const primaryColor = '#004AAD'; // Main brand color
	const secondaryColor = '#F4F4F4'; // Light background
	const textColor = '#333333'; // Default text color
	const accentColor = '#E63946'; // Call-to-action color
	const detailsBoxBg = '#FFFFFF'; // Background for details box
	const detailsBoxBorder = '#CCCCCC'; // Border color for details box

	// Reusable styles object that incorporates the above variables
	const styles = {
		container: `font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid ${primaryColor}; border-radius: 8px; overflow: hidden;`,
		header: `background: ${primaryColor}; padding: 20px; text-align: center;`,
		body: `background: ${secondaryColor}; padding: 20px; color: ${textColor}; text-align: center;`,
		detailsBox: `background: ${detailsBoxBg}; border: 1px solid ${detailsBoxBorder}; padding: 15px; margin: 20px auto; max-width: 80%; border-radius: 6px; text-align: left;`,
		descriptionBox: `background: #f4f4f4; border-left: 4px solid ${primaryColor}; padding: 10px; margin: 10px 0; font-style: italic;`,
		link: `color: ${primaryColor}; text-decoration: none;`,
		footer: `background: ${primaryColor}; padding: 10px; text-align: center; color: white;`,
	};

	// Ensure missing fields display as "Not provided"
	const formattedDescription = description ? description : 'Not provided';
	const formattedPhoneNumber = phoneNumber
		? `<a href="tel:${phoneNumber}" style="${styles.link}">${phoneNumber}</a>`
		: 'Not provided';

	// Get the current time in Central Time (Wisconsin - CST/CDT)
	const sentAtCentralTime = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Chicago',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	}).format(new Date());

	return {
		from: process.env.CLIENT_EMAIL,
		to: email,
		subject: `${name}, Thank You for Contacting Us`,
		text: `Dear ${name},

Thank you for reaching out to us. We have received your message and will get back to you shortly.

Details:
- Name: ${name}
- Email: ${email}
- Phone Number: ${phoneNumber || 'Not provided'}
- Description: ${formattedDescription}

Sent: ${sentAtCentralTime}

Best regards,
[Your Company Name]`,
		html: `
            <div style="${styles.container}">
                <div style="${styles.header}">
                    <img src="${logoUrl}" alt="Company Logo" style="max-width: 200px;"/>
                </div>
                <div style="${styles.body}">
                    <h2 style="color: ${primaryColor};">Thank You for Reaching Out, ${name}!</h2>
                    <p>We appreciate your message and will get back to you as soon as possible.</p>
                    
                    <!-- Centered Details Box -->
                    <div style="${styles.detailsBox}">
                        <p style="font-weight: bold; text-align: center;">Here are the details we received:</p>
                        <ul style="list-style-type: none; padding: 0; margin: 0;">
                            <li><strong>Name:</strong> ${name}</li>
                            <li><strong>Email:</strong> <a href="mailto:${email}" style="${styles.link}">${email}</a></li>
                            <li><strong>Phone Number:</strong> ${formattedPhoneNumber}</li>
                            
                            <br> <!-- Break before the description section -->
                            
                            <li><strong>Description:</strong></li>
                            <li style="${styles.descriptionBox}">
                                ${formattedDescription}
                            </li>
                            <li><strong>Sent:</strong> ${sentAtCentralTime}</li>
                        </ul>
                    </div>
                    
                    <p>If you have any urgent questions, feel free to call us directly.</p>
                    <p style="margin-top: 20px;"><strong>Best regards,</strong><br>[Your Company Name]</p>
                </div>
                <div style="${styles.footer}">
                    <p style="margin: 0;">Need immediate help? Call us at <a href="tel:[Your Phone Number]" style="color: ${accentColor}; text-decoration: none;">[Your Phone Number]</a></p>
                </div>
				 <div style="text-align: center; margin-top: 30px; padding-bottom: 20px; font-size: 13px; color: #777;">
                    <a href="https://www.latzwebdesign.com" target="_blank" rel="noopener noreferrer" style="color: #333; text-decoration: none;">
                        Powered by <span style="font-weight: bold;">LatzWebDesign</span><br/>
                        <span style="font-size: 12px;">© LatzWebDesign.com</span>
                    </a>
                </div>
            </div>
        `,
	};
};
