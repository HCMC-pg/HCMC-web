import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  delay = 0,
  y = 24,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: y ?? 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export interface MIconProps {
  name: string;
  size?: number;
  fill?: number;
  weight?: number;
  grade?: number;
  opticalSize?: number;
  className?: string;
}

export const MIcon: React.FC<MIconProps> = ({
  name,
  size = 20,
  fill = 0,
  weight = 400,
  grade = 0,
  opticalSize = 24,
  className = ''
}) => {
  return (
    <span
      className={cn('material-symbols-outlined select-none inline-flex items-center justify-center', className)}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};

export interface PrimaryButtonProps {
  children: React.ReactNode;
  as?: 'a' | 'button';
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  as = 'button',
  href,
  onClick,
  className = '',
  size = 'lg'
}) => {
  const sizeClasses = {
    sm: 'h-9 px-5 text-xs',
    md: 'h-10 px-7 text-xs',
    lg: 'h-12 px-9 text-sm'
  }[size];

  const content = (
    <span className="relative overflow-hidden inline-block group-hover:-translate-y-[120%] transition-transform duration-300 ease-out">
      <span>{children}</span>
      <span className="absolute left-0 top-[120%] block">{children}</span>
    </span>
  );

  const baseClasses = cn(
    'group inline-flex items-center justify-center rounded-full bg-white/85 hover:bg-white text-black font-medium leading-none transition-all shadow-lg hover:shadow-white/20 active:scale-95',
    sizeClasses,
    className
  );

  if (as === 'a') {
    return (
      <a href={href} onClick={onClick} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};
