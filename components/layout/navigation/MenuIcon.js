'use client';

import { motion } from 'framer-motion';

const MenuIcon = ({ toggleNav, isNavOpen }) => {
	return (
		<button className=' z-[99999] text-3xl text-dark' onClick={toggleNav}>
			<motion.div
				className='cursor-pointer'
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				<div className='flex flex-col space-y-1'>
					<span
						className={`block w-8 h-1 bg-dark transition-transform ${
							isNavOpen ? 'rotate-45 translate-y-2' : ''
						}`}
					/>
					<span
						className={`block w-8 h-1 bg-dark transition-opacity ${
							isNavOpen ? 'opacity-0' : ''
						}`}
					/>
					<span
						className={`block w-8 h-1 bg-dark transition-transform ${
							isNavOpen ? '-rotate-45 -translate-y-2' : ''
						}`}
					/>
				</div>
			</motion.div>
		</button>
	);
};

export default MenuIcon;
