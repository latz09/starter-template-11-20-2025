import Link from 'next/link';
import Logo from '@/components/lib/Logo';

const DesktopNavbar = ({ navLinks }) => {
	return (
	<div className='hidden lg:flex items-center gap-3 max-w-container mx-auto'>
			<Logo
				height = {125}
				width = {125}
			 
			/>
			<nav className='flex justify-around items-center w-full'>
				{navLinks.map((link, index) => (
					<Link key={index} href={link.url} className='block text-subheading 	transition-all duration-200 cursor-pointer'>
						{link.label}
					</Link>
				))}
			</nav>
		</div>
	);
};

export default DesktopNavbar;