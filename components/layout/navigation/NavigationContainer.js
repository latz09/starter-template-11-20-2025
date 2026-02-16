import MobileNavbar from '../../modals/MobileNavbar';
import DesktopNavbar from './DesktopNavbar';
import { navigationLinks } from '@/data/navigationLinks';

const NavigationContainer = () => {
	return (
		<nav className='py-2 px-container'>
			<MobileNavbar navLinks={navigationLinks} />
			<DesktopNavbar navLinks={navigationLinks} />
		</nav>
	);
};

export default NavigationContainer;