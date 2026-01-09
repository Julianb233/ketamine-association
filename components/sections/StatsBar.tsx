'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  Users,
  Heart,
  ThumbsUp,
  MapPin,
} from 'lucide-react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  {
    value: 500,
    suffix: '+',
    label: 'Certified Practitioners',
    icon: <Users className="h-6 w-6" />,
  },
  {
    value: 50000,
    suffix: '+',
    label: 'Patients Helped',
    icon: <Heart className="h-6 w-6" />,
  },
  {
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    icon: <ThumbsUp className="h-6 w-6" />,
  },
  {
    value: 50,
    suffix: '',
    label: 'States Covered',
    icon: <MapPin className="h-6 w-6" />,
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

export function StatsBar() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 left-20 w-32 h-32 bg-white rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-10 right-20 w-40 h-40 bg-white rounded-full blur-3xl"
      />

      <div
        ref={containerRef}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              className="flex flex-col items-center text-center group relative"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white mb-4 transition-all duration-300"
              >
                {stat.icon}
              </motion.div>

              {/* Value with Animated Counter */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div className="text-sm sm:text-base text-teal-100 font-medium">
                {stat.label}
              </div>

              {/* Divider (desktop only) */}
              {index < stats.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/20 origin-center"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
