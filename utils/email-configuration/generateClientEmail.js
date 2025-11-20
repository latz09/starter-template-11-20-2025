export const generateClientEmail = ({
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

    // Define reusable inline styles using the basic styling variables
    const styles = {
        container: `font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid ${primaryColor}; border-radius: 8px; overflow: hidden;`,
        header: `background: ${primaryColor}; padding: 20px; text-align: center;`,
        body: `background: ${secondaryColor}; padding: 20px; color: ${textColor};`,
        detailsBox: `background: #FFFFFF; border: 1px solid #CCCCCC; padding: 15px; margin: 20px auto; max-width: 80%; border-radius: 6px; text-align: left;`,
        footer: `background: ${primaryColor}; padding: 10px; text-align: center; color: white;`,
        descriptionBox: `background: #f4f4f4; border-left: 4px solid ${primaryColor}; padding: 10px; margin: 10px 0; font-style: italic;`,
        link: `color: ${primaryColor}; text-decoration: none;`,
        accent: `color: ${accentColor}; text-decoration: none;`
    };

    // Ensure missing fields display as "Not provided"
    const formattedPhoneNumber = phoneNumber
        ? `<a href="tel:${phoneNumber}" style="${styles.link}">${phoneNumber}</a>`
        : 'Not provided';
    const formattedDescription = description ? description : 'Not provided';

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
        from: `Contact Form Submission <${email}>`,
        to: process.env.CLIENT_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        text: `A new form has been submitted with the following details:
        
        Name: ${name}
        Email: ${email}
        Phone Number: ${phoneNumber ? phoneNumber : 'Not provided'}
        Description: ${formattedDescription}
        Sent: ${sentAtCentralTime}`,
        html: `
            <div style="${styles.container}">
                <div style="${styles.header}">
                    <img src="${logoUrl}" alt="Company Logo" style="max-width: 200px;"/>
                </div>
                <div style="${styles.body}">
                    <h2 style="color: ${primaryColor};">New Contact Form Submission</h2>
                    <p>You have received a new message from your website's contact form.</p>

                    <!-- Centered Details Box -->
                    <div style="${styles.detailsBox}">
                        <p style="font-weight: bold; text-align: center;">Here are the details we received:</p>
                        <ul style="list-style-type: none; padding: 0; margin: 0;">
                            <li><strong>Name:</strong> ${name}</li>
                            <li><strong>Email:</strong> <a href="mailto:${email}" style="${styles.link}">${email}</a></li>
                            <li><strong>Phone Number:</strong> ${formattedPhoneNumber}</li>
                        </ul>

                        <br> <!-- Break before the description section -->

                        <p style="font-weight: bold;">Description:</p>
                        <div style="${styles.descriptionBox}">
                            ${formattedDescription}
                        </div>

                        <p><strong>Sent:</strong> ${sentAtCentralTime}</p>
                    </div>

                    <p style="margin-top: 20px;"><strong>Next Steps:</strong> Please review and follow up as needed.</p>
                </div>
                <div style="${styles.footer}">
                    <p style="margin: 0;">Need to reply? Email <a href="mailto:${email}" style="${styles.accent}">${name}</a> directly.</p>
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
