import MobileNavbar from '../../modals/MobileNavbar';
import DesktopNavbar from './DesktopNavbar';
import { fetchContent as fc } from '@/utils/cms/fetchContent';
import { FETCH_NAVIGATION_QUERY as Q } from '@/data/queries/navigation/FETCH_NAVIGATION_QUERY';

const NavigationContainer = async () => {
	const data = await fc(Q);
	const navlinks = data?.navLinks || [];
	console.log(navlinks)

	return (
		<nav className='px-0.25 py-1'>
			<MobileNavbar navLinks={navlinks} />
			<DesktopNavbar navLinks={navlinks} />
		</nav>
	);
};

export default NavigationContainer;

export const revalidate = 10;