// src/utils/motion.js
const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const instant = { duration: 0 };

export const fadeUp = {
  hidden:  { opacity: 0, y: reduced ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduced ? instant : { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: reduced ? instant : { duration: 0.5, ease: 'easeOut' },
  },
};

export const slideInLeft = {
  hidden:  { opacity: 0, x: reduced ? 0 : -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: reduced ? instant : { duration: 0.7, ease: 'easeOut' },
  },
};

export const slideInRight = {
  hidden:  { opacity: 0, x: reduced ? 0 : 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: reduced ? instant : { duration: 0.7, ease: 'easeOut' },
  },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: reduced ? 1 : 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: reduced ? instant : { duration: 0.5, ease: 'easeOut' },
  },
};

export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: reduced ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduced ? instant : { duration: 0.5, ease: 'easeOut' },
  },
};
