const ContactForm = ({
	formData,
	handleInputChange,
	handleSubmit,
	isLoading,
	error,
	success,
}) => {
	return (
		<form
			onSubmit={handleSubmit}
			className='w-full max-w-3xl mx-auto px-1 py-2'
		>
			<div className='mb-2'>
				<h2>Get in Touch</h2>
				<p className='text-paragraph text-dark/60'>
					Fill out the form below and we will get back to you shortly.
				</p>
			</div>

			<div className='space-y-1.5 mb-2'>
				<div>
					<label
						htmlFor='name'
						className='text-caption font-semibold block mb-0.5'
					>
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
						className='w-full px-1 py-0.75 border border-dark/20 rounded bg-white text-paragraph focus:outline-none focus:border-secondary transition-all duration-300'
					/>
				</div>

				<div>
					<label
						htmlFor='email'
						className='text-caption font-semibold block mb-0.5'
					>
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
						className='w-full px-1 py-0.75 border border-dark/20 rounded bg-white text-paragraph focus:outline-none focus:border-secondary transition-all duration-300'
					/>
				</div>

				<div>
					<label
						htmlFor='phoneNumber'
						className='text-caption font-semibold block mb-0.5'
					>
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
						className='w-full px-1 py-0.75 border border-dark/20 rounded bg-white text-paragraph focus:outline-none focus:border-secondary transition-all duration-300'
					/>
				</div>

				<div>
					<label
						htmlFor='message'
						className='text-caption font-semibold block mb-0.5'
					>
						Message
					</label>
					<textarea
						id='message'
						name='message'
						value={formData.message}
						onChange={handleInputChange}
						placeholder='Tell us about your project...'
						rows='5'
						className='w-full px-1 py-0.75 border border-dark/20 rounded bg-white text-paragraph focus:outline-none focus:border-secondary transition-all duration-300 resize-none'
					/>
				</div>
			</div>

			<button
				type='submit'
				disabled={isLoading}
				className='w-full bg-primary text-button text-white py-0.75 rounded border border-primary hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
			>
				{isLoading ? 'Sending...' : 'Send Message'}
			</button>

			{error && (
				<p className='mt-1 p-1 rounded border border-dark/20 text-caption text-dark/70 bg-white'>
					{error}
				</p>
			)}
			{success && (
				<p className='mt-1 p-1 rounded border border-secondary text-caption text-primary bg-white'>
					{success}
				</p>
			)}
		</form>
	);
};

export default ContactForm;
