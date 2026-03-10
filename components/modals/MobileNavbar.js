'use client';

import { track } from '@vercel/analytics';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import MenuIcon from '../layout/navigation/MenuIcon';
import Logo from '../lib/Logo';

const MobileNavbar = ({ navLinks = [], variant, logoUrl }) => {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleNav = () => setIsNavOpen(!isNavOpen);

	const handleNavClick = (label, url) => {
		track(`CTA Click - Mobile Nav - ${label}`, {
			destination: url,
			buttonText: label,
		});
		toggleNav();
	};

	const mainLinks = navLinks.filter((link) => !link.isButton);
	const contactLink = navLinks.find((link) => link.isButton);

	useEffect(() => {
		if (isNavOpen) {
			const scrollY = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.left = '0';
			document.body.style.right = '0';
			document.body.style.overflow = 'hidden';
			document.body.dataset.scrollY = scrollY;
		} else {
			const scrollY = document.body.dataset.scrollY || '0';
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.left = '';
			document.body.style.right = '';
			document.body.style.overflow = '';
			window.scrollTo(0, parseInt(scrollY));
		}
	}, [isNavOpen]);

	const overlayVariants = {
		closed: { opacity: 0 },
		open: { opacity: 1 },
	};

	const menuVariants = {
		closed: { x: '100%' },
		open: { x: '0%' },
	};

	const linkContainerVariants = {
		closed: { opacity: 0 },
		open: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08,
				delayChildren: 0.2,
			},
		},
	};

	const linkVariants = {
		closed: { x: 40, opacity: 0 },
		open: { x: 0, opacity: 1 },
	};

	return (
		<div className='lg:hidden relative z-20'>
			<header className='flex items-center justify-between'>
				<Logo height={75} width={75} variant={variant} url={logoUrl} />
				<MenuIcon
					isNavOpen={isNavOpen}
					toggleNav={toggleNav}
					variant={isNavOpen ? 'light' : variant}
				/>
			</header>

			<AnimatePresence>
				{isNavOpen && (
					<>
						{/* Overlay */}
						<motion.div
							className='fixed inset-0 bg-dark/60 backdrop-blur-sm z-[9998]'
							variants={overlayVariants}
							initial='closed'
							animate='open'
							exit='closed'
							transition={{ duration: 0.3 }}
							onClick={toggleNav}
						/>

						{/* Menu Panel */}
						<motion.nav
							className='fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-light z-[9999] shadow-lifted'
							variants={menuVariants}
							initial='closed'
							animate='open'
							exit='closed'
							transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
							onClick={(e) => e.stopPropagation()}
							role='dialog'
							aria-modal='true'
						>
							<div className='flex flex-col h-full px-xs py-xs'>
								{/* Header */}
								<div className='flex items-center justify-between mb-xl'>
									<Logo height={75} width={75} variant='dark' url={logoUrl}	 />
								</div>

								{/* Links */}
								<motion.ul
									className='flex-1 space-y-0.5'
									variants={linkContainerVariants}
									initial='closed'
									animate='open'
								>
									{mainLinks.map((link, index) => (
										<motion.li key={index} variants={linkVariants}>
											<Link
												href={link.url}
												onClick={() => handleNavClick(link.label, link.url)}
												className='block py-0.5 text-dark text-subheading font-[500] border-b border-primary transition-colors duration-300 hover:text-primary'
											>
												{link.label}
											</Link>
										</motion.li>
									))}
								</motion.ul>

								{/* Contact CTA */}
								{contactLink && (
									<motion.div
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.5, duration: 0.4 }}
										className='pt-xs border-t border-primary/50'
									>
										<Link
											href={contactLink.url}
											onClick={() =>
												handleNavClick(contactLink.label, contactLink.url)
											}
											className='block w-full py-0.75 text-center text-button bg-primary text-white rounded-sm transition-all duration-300 hover:bg-primary/75'
										>
											{contactLink.label}
										</Link>
									</motion.div>
								)}
							</div>
						</motion.nav>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MobileNavbar;
