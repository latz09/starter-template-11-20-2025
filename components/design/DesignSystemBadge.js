'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const DesignSystemBadge = () => {
    const pathname = usePathname();
    const router = useRouter();
    const isDesignPage = pathname === '/design-and-development';

    if (isDesignPage) {
        return (
            <button
                onClick={() => router.back()}
                className='fixed bottom-1 right-1 z-50 flex items-center gap-0.75 bg-pookiePink border border-dark/0 text-dark text-[0.875rem] font-mono px-1.25 py-0.75 rounded-full shadow-lg lg:text-xl hover:bg-dark hover:border-pookiePink hover:text-cream transition-all duration-200'
            >
                ← go back
            </button>
        );
    }

    return (
        <Link
            href='/design-and-development'
            className='fixed bottom-1 right-1 z-50 flex items-center gap-0.75 bg-pookiePink text-cream text-[0.875rem] font-mono px-1.25 py-0.75 rounded-full shadow-lg hover:bg-goldDark transition-all duration-200 group'
        >
            <span className='text-dark lg:text-xl group-hover:text-pookiePink'>✦</span>
            <span className='max-w-0 lg:text-xl overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap'>
                design system
            </span>
        </Link>
    );
};

export default DesignSystemBadge;