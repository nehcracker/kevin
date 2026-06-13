// src/components/common/AnimatedCounter/AnimatedCounter.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const AnimatedCounter = ({ target, suffix = '', duration = 2000, className = '' }) => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    if (isNaN(numeric)) { setCount(target); return; }

    const startTime = performance.now();
    const tick = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(numeric);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
