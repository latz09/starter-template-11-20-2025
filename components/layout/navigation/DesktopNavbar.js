'use client';

import Link from 'next/link';
import { track } from '@vercel/analytics';
import Logo from '@/components/lib/Logo';

const DesktopNavbar = ({ navLinks, logoUrl }) => {
    const mainLinks = navLinks.filter((link) => !link.isButton);
    const contactLink = navLinks.find((link) => link.isButton);

    const handleNavClick = (label, url) => {
        track(`CTA Click - Navbar - ${label}`, {
            destination: url,
            buttonText: label,
        });
    };

    return (
        <div className='hidden lg:flex items-center max-w-container mx-auto w-full'>
            <Logo height={125} width={125} url={logoUrl} />
            <nav className='flex gap-2 items-center ml-auto'>
                {mainLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        onClick={() => handleNavClick(link.label, link.url)}
                        className='block text-subheading transition-all duration-200 cursor-pointer'
                    >
                        {link.label}
                    </Link>
                ))}
                {contactLink && (
                    <Link
                        href={contactLink.url}
                        onClick={() => handleNavClick(contactLink.label, contactLink.url)}
                        className='block text-subheading transition-all duration-200 cursor-pointer bg-primary text-white hover:bg-primary/75 px-1 py-0.5 rounded'
                    >
                        {contactLink.label}
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default DesktopNavbar;