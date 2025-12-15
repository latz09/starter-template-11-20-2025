// /utils/email-configuration/emailTemplateBuilder.js

export class EmailTemplateBuilder {
	constructor(clientConfig) {
		this.config = clientConfig;
		this.styles = this.generateStyles();
	}

	generateStyles() {
		const { colors } = this.config.branding;
		return {
			// Main email container - enterprise styling
			container: `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);`,

			// Top header section with logo
			header: `background: ${colors.headerBackground}; padding: 32px 24px; text-align: center; border-bottom: 1px solid #e5e7eb;`,
			logo: `max-width: 180px; height: auto; display: inline-block;`,

			// Main body section
			body: `background: ${colors.bodyBackground}; padding: 32px 24px; color: ${colors.textPrimary};`,

			// Main heading (h2)
			mainHeading: `color: ${colors.textPrimary}; margin: 0 0 16px 0; font-size: 24px; font-weight: 600; line-height: 1.3; letter-spacing: -0.02em;`,

			// Body paragraphs
			bodyText: `color: ${colors.textPrimary}; line-height: 1.6; font-size: 15px; margin: 0 0 16px 0;`,

			// Details box - card design
			detailsBox: `background: ${colors.detailsBoxBackground}; padding: 24px; margin: 24px 0; border-radius: 8px; border: 1px solid #e5e7eb;`,

			// "Here are the details we received" heading
			detailsBoxHeading: `font-weight: 600; color: #6b7280; margin: 0 0 20px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;`,

			// Individual field rows
			fieldRow: `margin: 0; padding: 14px 0; border-bottom: 1px solid #e5e7eb;`,
			fieldRowLast: `margin: 0; padding: 14px 0;`,

			// Field labels (Name:, Email:, etc)
			label: `font-weight: 600; color: ${colors.textPrimary}; font-size: 14px; display: block; margin-bottom: 4px;`,

			// Field values
			value: `color: ${colors.textPrimary}; font-size: 14px; display: block; word-break: break-word;`,

			// Description/textarea field
			descriptionBox: `background: ${colors.descriptionBackground}; border-left: 3px solid ${colors.descriptionBorderLeft}; padding: 16px; margin: 8px 0 0 0; font-style: normal; color: ${colors.textPrimary}; font-size: 14px; line-height: 1.6; border-radius: 4px;`,

			// "Not provided" text
			notProvided: `color: ${colors.textMuted}; font-style: italic; font-size: 14px;`,

			// Footer section
			footer: `background: ${colors.footerBackground}; padding: 24px; text-align: center;`,
			footerText: `margin: 0; color: ${colors.footerText}; font-size: 14px; line-height: 1.6;`,

			// Clickable links (email/phone in body)
			link: `color: ${colors.textPrimary}; text-decoration: underline; font-weight: 500; word-break: break-all;`,

			// Footer links (different color for visibility on dark background)
			footerLink: `color: ${colors.descriptionBorderLeft}; text-decoration: underline; font-weight: 600;`,

			// Powered by footer
			poweredBy: `text-align: center; padding: 20px 24px; font-size: 12px; color: #9ca3af; background: #f9fafb; border-top: 1px solid #e5e7eb;`,
			poweredByLink: `color: #6b7280; text-decoration: none; font-weight: 500;`,

			// Next steps callout box
			nextSteps: `margin: 24px 0 0 0; padding: 16px; background: #f9fafb; border-radius: 6px; color: ${colors.textPrimary}; font-size: 14px; border-left: 3px solid ${colors.descriptionBorderLeft};`,

			// Closing/signature section
			closing: `margin: 24px 0 0 0; color: ${colors.textPrimary}; font-size: 15px; line-height: 1.6;`,

			// Strong/bold text
			strong: `font-weight: 600; color: ${colors.textPrimary};`,
		};
	}

	formatFieldValue(field, value) {
		if (!value || value === 'Not provided') {
			return `<span style="${this.styles.notProvided}">Not provided</span>`;
		}

		switch (field.type) {
			case 'email':
				return `<a href="mailto:${value}" style="${this.styles.link}">${value}</a>`;
			case 'tel':
				return `<a href="tel:${value}" style="${this.styles.link}">${value}</a>`;
			case 'textarea':
				return `<div style="${this.styles.descriptionBox}">${value}</div>`;
			default:
				return `<span style="${this.styles.value}">${value}</span>`;
		}
	}

	buildFieldRows(formData) {
		const fields = this.config.formFields;
		return fields
			.map((field, index) => {
				const value = formData[field.name] || 'Not provided';
				const formattedValue = this.formatFieldValue(field, value);
				const isLast = index === fields.length - 1;
				const rowStyle = isLast
					? this.styles.fieldRowLast
					: this.styles.fieldRow;

				// Textarea gets special treatment
				if (field.type === 'textarea') {
					return `
						<div style="${rowStyle}">
							<span style="${this.styles.label}">${field.label}:</span>
							${formattedValue}
						</div>
					`;
				}

				return `
					<div style="${rowStyle}">
						<span style="${this.styles.label}">${field.label}:</span>
						${formattedValue}
					</div>
				`;
			})
			.join('');
	}

	buildClientEmail(formData) {
		const { name, email } = formData;
		const timestamp = new Intl.DateTimeFormat('en-US', {
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
			from: `Contact Form <${email}>`,
			to: process.env.CLIENT_EMAIL,
			subject: this.config.messaging.clientEmailSubject(name),
			html: `
				<div style="${this.styles.container}">
					<div style="${this.styles.header}">
						<img src="${this.config.branding.logoUrl}" alt="${
				this.config.branding.name
			} Logo" style="${this.styles.logo}"/>
					</div>
					<div style="${this.styles.body}">
						<h2 style="${this.styles.mainHeading}">New Contact Form Submission</h2>
						<p style="${
							this.styles.bodyText
						}">You have received a new message from your website's contact form.</p>
						
						<div style="${this.styles.detailsBox}">
							<p style="${this.styles.detailsBoxHeading}">Submission Details</p>
							${this.buildFieldRows(formData)}
							<div style="${this.styles.fieldRowLast}">
								<span style="${this.styles.label}">Sent:</span>
								<span style="${this.styles.value}">${timestamp}</span>
							</div>
						</div>
						
						<div style="${this.styles.nextSteps}">
							<strong style="${
								this.styles.strong
							}">Next Steps:</strong> Please review and follow up as needed.
						</div>
					</div>
					<div style="${this.styles.footer}">
						<p style="${this.styles.footerText}">
							Need to reply?<br/>
							Email <a href="mailto:${email}" style="${
				this.styles.footerLink
			}">${name}</a> directly.
						</p>
					</div>
					${this.buildPoweredByFooter()}
				</div>
			`,
		};
	}

	buildAutoResponse(formData) {
		const { name, email } = formData;
		const timestamp = new Intl.DateTimeFormat('en-US', {
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
			from: `${this.config.branding.name} <${process.env.CLIENT_EMAIL}>`,
			to: email,
			subject: this.config.messaging.autoResponseSubject(name),
			html: `
				<div style="${this.styles.container}">
					<div style="${this.styles.header}">
						<img src="${this.config.branding.logoUrl}" alt="${
				this.config.branding.name
			} Logo" style="${this.styles.logo}"/>
					</div>
					<div style="${this.styles.body}">
						<h2 style="${
							this.styles.mainHeading
						}">${this.config.messaging.autoResponseGreeting(name)}</h2>
						<p style="${this.styles.bodyText}">${this.config.messaging.autoResponseBody}</p>
						
						<div style="${this.styles.detailsBox}">
							<p style="${this.styles.detailsBoxHeading}">Your Submission</p>
							${this.buildFieldRows(formData)}
							<div style="${this.styles.fieldRowLast}">
								<span style="${this.styles.label}">Sent:</span>
								<span style="${this.styles.value}">${timestamp}</span>
							</div>
						</div>
						
						<p style="${
							this.styles.bodyText
						}">If you have any urgent questions, feel free to call us directly.</p>
						
						<div style="${this.styles.closing}">
							<strong style="${this.styles.strong}">Best regards,</strong><br/>
							${this.config.messaging.autoResponseClosing}
						</div>
					</div>
					<div style="${this.styles.footer}">
						<p style="${this.styles.footerText}">
							Need immediate help?<br/>
							Call us at <a href="tel:${
								this.config.branding.contactInfo.phone
							}" style="${this.styles.footerLink}">${
				this.config.branding.contactInfo.phone
			}</a>
						</p>
					</div>
					${this.buildPoweredByFooter()}
				</div>
			`,
		};
	}

	buildPoweredByFooter() {
		return `
			<div style="${this.styles.poweredBy}">
				<a href="https://www.latzwebdesign.com" target="_blank" rel="noopener noreferrer" style="${this.styles.poweredByLink}">
					Powered by <strong>Latz Web Design</strong><br/>
					<span style="font-size: 11px;">© LatzWebDesign.com</span>
				</a>
			</div>
		`;
	}
}