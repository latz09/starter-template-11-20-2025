'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ModalOverlay from './ModalOverlay';
import MenuIcon from '../layout/navigation/MenuIcon';
import Logo from '../lib/Logo';
 
const MobileNavbar = ({ navLinks = [] }) => {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleNav = () => setIsNavOpen(!isNavOpen);

	const menuMotion = {
		initial: { x: '100%' },
		animate: { x: '0%' },
		exit: { x: '-100%' },
		transition: { duration: 0.45, ease: 'easeInOut' },
	};

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

	return (
		<div className='lg:hidden relative z-20'>
			<header className='flex items-center justify-between'>
				<Logo 
					height={100}
					width={100}
				/>
				<MenuIcon isNavOpen={isNavOpen} toggleNav={toggleNav} />
			</header>

			<AnimatePresence>
				{isNavOpen && (
					<>
						<ModalOverlay isOpen={isNavOpen} onClose={toggleNav} />
						<motion.nav
							{...menuMotion}
							className='text-dark fixed inset-0 px-8 pt-24 pb-16 flex flex-col justify-center z-[9999]'
							onClick={(e) => e.stopPropagation()}
							role='dialog'
							aria-modal='true'
						>
							<ul className='w-full space-y-6 text-center'>
								{navLinks.map((link, index) => (
									<li key={index}>
										<Link href={link.href} onClick={toggleNav} className='block w-full text-2xl font-semibold border border-dark shadow-soft py-2 transition-all duration-200'>
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						</motion.nav>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MobileNavbar;
