'use client';

import { motion } from 'framer-motion';

/**
 * Shared animation settings
 */
const defaultTransition = {
	duration: 1.2,
	ease: [0.43, 0.13, 0.23, 0.96],
};

/**
 * Fade up on scroll
 */
export const AnimateUp = ({ children, className = '', ...rest }) => {
	const variants = {
		hidden: { y: 70, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: defaultTransition,
		},
	};

	return (
		<div className='overflow-hidden'>
			<motion.div
				className={className}
				variants={variants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				{...rest}
			>
				{children}
			</motion.div>
		</div>
	);
};

/**
 * Slide in from left
 */
export const AnimateLeft = ({ children, className = '', ...rest }) => {
	const variants = {
		hidden: { x: -50, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: defaultTransition,
		},
	};

	return (
		<div className='overflow-hidden'>
			<motion.div
				className={className}
				variants={variants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				{...rest}
			>
				{children}
			</motion.div>
		</div>
	);
};

/**
 * Slide in from right
 */
export const AnimateRight = ({ children, className = '', ...rest }) => {
	const variants = {
		hidden: { x: 50, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: defaultTransition,
		},
	};

	return (
		<div className='overflow-hidden'>
			<motion.div
				className={className}
				variants={variants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				{...rest}
			>
				{children}
			</motion.div>
		</div>
	);
};

/**
 * Scale up
 */
export const AnimateScale = ({ children, className = '', ...rest }) => {
	const variants = {
		hidden: { scale: 0.9, opacity: 0 },
		visible: {
			scale: 1,
			opacity: 1,
			transition: { duration: 0.5, ease: 'easeOut' },
		},
	};

	return (
		<motion.div
			className={className}
			variants={variants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			{...rest}
		>
			{children}
		</motion.div>
	);
};

/**
 * Fade only
 */
export const AnimateFade = ({ children, className = '', ...rest }) => {
	const variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { duration: 0.6 },
		},
	};

	return (
		<motion.div
			className={className}
			variants={variants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			{...rest}
		>
			{children}
		</motion.div>
	);
};