import ButtonLink from "../ui/ButtonLink";

const ButtonPreviews = () => {
	return (
		<div className="my-12">
			{/* Light background buttons */}
			<div className='max-w-5xl mx-auto px-8 grid place-items-center border-t '>
				<div className='py-4 flex gap-4'>
					<ButtonLink variant='primary-on-light' href='#'>
						Primary on Light
					</ButtonLink>
					<ButtonLink variant='secondary-on-light' href='#'>
						Secondary on Light
					</ButtonLink>
					<ButtonLink variant='dark-on-light' href='#'>
						Dark on Light
					</ButtonLink>
				</div>
			</div>

			{/* Dark background section */}
			<div className='bg-dark grid place-items-center'>
				<div className='max-w-5xl mx-auto px-8 '>
					<div className=' py-4 flex gap-4'>
						<ButtonLink variant='primary-on-dark' href='#'>
							Primary on Dark
						</ButtonLink>
						<ButtonLink variant='secondary-on-dark' href='#'>
							Secondary on Dark
						</ButtonLink>
						<ButtonLink variant='light-on-dark' href='#'>
							Light on Dark
						</ButtonLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ButtonPreviews;