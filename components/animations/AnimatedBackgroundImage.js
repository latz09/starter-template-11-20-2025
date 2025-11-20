'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Utility function to reverse animation arrays in an object
const reverseAnimation = (animationObj) => {
  const newAnimation = {};
  for (const key in animationObj) {
    if (Array.isArray(animationObj[key])) {
      newAnimation[key] = [...animationObj[key]].reverse();
    } else {
      newAnimation[key] = animationObj[key];
    }
  }
  return newAnimation;
};

const AnimatedBackgroundImage = ({
  imageUrl,
  backgroundPosition = 'center', // Default to 'center'
  largeScreenAnimation = { backgroundPositionY: ['10%', '30%'] }, // Default animation for large screens
  smallScreenAnimation = { backgroundPositionX: ['35%', '60%'] }, // Default animation for small screens
  largeScreenDuration = 15, // Default duration for large screens (vertical movement)
  smallScreenDuration = 10, // Default duration for small screens (horizontal movement)
  reverseLarge = false, // Reverse animation for large screens if true
  reverseSmall = false, // Reverse animation for small screens if true
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // Tailwind's lg breakpoint is 1024px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Determine animation based on screen size and reverse props
  const animation = isLargeScreen
    ? reverseLarge
      ? reverseAnimation(largeScreenAnimation)
      : largeScreenAnimation
    : reverseSmall
    ? reverseAnimation(smallScreenAnimation)
    : smallScreenAnimation;

  // Choose the duration based on screen size
  const duration = isLargeScreen ? largeScreenDuration : smallScreenDuration;

  return (
    <motion.div
      animate={animation}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition, // Default or passed-in value
      }}
    />
  );
};

export default AnimatedBackgroundImage;