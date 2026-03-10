import Image from 'next/image';
import localLogo from '@/public/images/business-name.png';
import Link from 'next/link';

const Logo = ({ height, width, url }) => {
    return (
        <Link href='/'>
            <div className='z-[9999]'>
                <Image
                    src={url || localLogo}
                    alt='logo'
                    width={width}
                    height={height}
                />
            </div>
        </Link>
    );
};

export default Logo;