import MobileNavbar from '../../modals/MobileNavbar';
import DesktopNavbar from './DesktopNavbar';
import { fetchContent as fc } from '@/utils/cms/fetchContent';
import { FETCH_NAVIGATION_QUERY as Q } from '@/data/queries/navigation/FETCH_NAVIGATION_QUERY';

const NavigationContainer = async () => {
    const data = await fc(Q);
    const navlinks = data?.navLinks || [];
    const logoUrl = data?.logo?.asset?.url || null;

    return (
        <nav className='px-1 py-1'>
            <MobileNavbar navLinks={navlinks} logoUrl={logoUrl} />
            <DesktopNavbar navLinks={navlinks} logoUrl={logoUrl} />
        </nav>
    );
};

export default NavigationContainer;

export const revalidate = 10;