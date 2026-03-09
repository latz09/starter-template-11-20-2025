import MobileNavbar from '../../modals/MobileNavbar';
import DesktopNavbar from './DesktopNavbar';
import { fetchContent as f } from '@/utils/cms/fetchContent';
import { FETCH_NAVIGATION_QUERY as Q } from '@/data/queries/navigation/FETCH_NAVIGATION_QUERY';

const NavigationContainer = async () => {
	const data = await f(Q);
	const navlinks = data?.navLinks || [];

	return (
		<nav className='px-0.25 py-1'>
			<MobileNavbar navLinks={navlinks} />
			<DesktopNavbar navLinks={navlinks} />
		</nav>
	);
};

export default NavigationContainer;