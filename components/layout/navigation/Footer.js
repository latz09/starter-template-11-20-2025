import Link from 'next/link';
import Logo from '../../lib/Logo';

const currentYear = new Date().getFullYear();
const CLIENT_BUSINESS_NAME = 'Your Business Name';

const Footer = () => {
	return (
		<footer>
			<div className='py-16 grid place-items-center '>
				<Logo height={200} width={200} />
			</div>
			<CopyRight />
		</footer>
	);
};

export default Footer;

const CopyRight = () => {
	// Get the current year

	return (
		<div className='text-center pb-3 mt-2 px-2  grid gap-3 text-dark'>
			<Link href='/legal/privacy-policy'>
				<span className='text-xs font-semibold'>Privacy Policy</span>
			</Link>

			<p>{`© ${currentYear} by ${CLIENT_BUSINESS_NAME}`}</p>
			<PoweredBy />
		</div>
	);
};

const PoweredBy = () => {
	return (
		<div>
			<a
				href='https://www.latzwebdesign.com'
				target='_blank'
				rel='noopener noreferrer'
				className='grid place-items-center  text-dark '
			>
				<p>
					{`Powered by `}
					<span className='font-bold '>LatzWebDesign</span>
				</p>
				<p className='text-sm font-semibold'>© LatzWebDesign.com</p>
			</a>
		</div>
	);
};
