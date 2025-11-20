'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
/**
 * ParallaxImage
 * Slightly shifts an image based on scroll position (good for floating effect)
 */
export const ParallaxImage = ({
	children,
	speed = 0.3,
	className = '',
	style = {},
	...rest
}) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
	const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

	return (
		<motion.div
			ref={ref}
			style={{ y: smoothY, ...style }}
			className={className}
			{...rest}
		>
			{children}
		</motion.div>
	);
};

/**
 * ParallaxSection
 * Moves an entire content block slightly as user scrolls
 */
export const ParallaxSection = ({
	children,
	speed = 0.3,
	className = '',
	...rest
}) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
	const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

	return (
		<motion.section
			ref={ref}
			style={{ y: smoothY }}
			className={className}
			{...rest}
		>
			{children}
		</motion.section>
	);
};

/**
 * ParallaxBackground
 * Background image scrolls at different speed than the content
 */
export const ParallaxBackground = ({
	src,
	speed = 0.3,
	className = '',
	children,
	height = '100vh',
	overlayClass = '',
	...rest
}) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
	const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

	return (
		<section
			ref={ref}
			className={`relative overflow-hidden ${className}`}
			style={{ height }}
			{...rest}
		>
			<motion.div
				className='absolute inset-0 z-0 bg-cover bg-center'
				style={{
					y: smoothY,
					backgroundImage: `url(${src})`,
				}}
			/>
			<div className={`relative z-10 ${overlayClass}`}>{children}</div>
		</section>
	);
};

/**
 * ParallaxColorSection
 * A colored background that scrolls at a different speed than its foreground content
 */
export const ParallaxColorSection = ({
	children,
	className = 'bg-dark',
	speed = 0.2,
	height = '60vh',
	contentClass = 'flex flex-col items-center justify-center text-center text-white px-6',
	...rest
}) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
	const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

	return (
		<section
			ref={ref}
			className='relative overflow-hidden w-full'
			style={{ height }}
			{...rest}
		>
			{/* Background color block that scrolls differently */}
			<motion.div
				style={{ y: smoothY }}
				className={`absolute inset-0 z-0 ${className}`}
			/>

			{/* Foreground content */}
			<div className={`relative z-10 h-full ${contentClass}`}>{children}</div>
		</section>
	);
};
