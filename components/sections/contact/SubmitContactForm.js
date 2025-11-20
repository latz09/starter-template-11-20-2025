'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';

const SubmitContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phoneNumber: '',
		message: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		setSuccess('');

		try {
			const response = await fetch('/api/submitContactForm', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (result.success) {
				setFormData({
					name: '',
					email: '',
					phoneNumber: '',
					message: '',
				});
				setSuccess('Message sent successfully!');
			} else {
				setError(result.message || 'Something went wrong. Try again.');
			}
		} catch (err) {
			setError('Failed to send message. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ContactForm
			formData={formData}
			handleInputChange={handleInputChange}
			handleSubmit={handleSubmit}
			isLoading={isLoading}
			error={error}
			success={success}
		/>
	);
};

export default SubmitContactForm;