const ContactForm = ({
	formData,
	handleInputChange,
	handleSubmit,
	isLoading,
	error,
	success,
}) => {
	return (
		<form onSubmit={handleSubmit} className='form-container'>
			<div className='form-header'>
				<h2 className='form-title'>Get in Touch</h2>
				<p className='form-subtitle'>
					Fill out the form below and we will get back to you shortly.
				</p>
			</div>

			<div className='form-fields'>
				<div className='form-field'>
					<label htmlFor='name' className='form-label'>
						Name*
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
						required
						placeholder='Your name'
						className='form-input'
					/>
				</div>

				<div className='form-field'>
					<label htmlFor='email' className='form-label'>
						Email*
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						required
						placeholder='you@example.com'
						className='form-input'
					/>
				</div>

				<div className='form-field'>
					<label htmlFor='phoneNumber' className='form-label'>
						Phone Number*
					</label>
					<input
						type='tel'
						id='phoneNumber'
						name='phoneNumber'
						value={formData.phoneNumber}
						onChange={handleInputChange}
						required
						placeholder='(123) 456-7890'
						className='form-input'
					/>
				</div>

				<div className='form-field'>
					<label htmlFor='message' className='form-label'>
						Message
					</label>
					<textarea
						id='message'
						name='message'
						value={formData.message}
						onChange={handleInputChange}
						className='form-input'
						placeholder='Tell us about your project...'
						rows='5'
					></textarea>
				</div>
			</div>

			<button
				type='submit'
				className='form-submit'
				disabled={isLoading}
			>
				{isLoading ? 'Sending...' : 'Send Message'}
			</button>

			{error && <p className='form-message form-error'>{error}</p>}
			{success && <p className='form-message form-success'>{success}</p>}
		</form>
	);
};

export default ContactForm;