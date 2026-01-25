import React from 'react';

interface RupeeIconProps {
  className?: string;
  size?: number | string;
  color?: string;
}

export const RupeeIcon: React.FC<RupeeIconProps> = ({ 
  className = "", 
  size = 20, 
  color = "currentColor" 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
};

// Predefined sizes for common use cases
export const RupeeIconSmall: React.FC<Omit<RupeeIconProps, 'size'>> = (props) => (
  <RupeeIcon {...props} size={16} />
);

export const RupeeIconMedium: React.FC<Omit<RupeeIconProps, 'size'>> = (props) => (
  <RupeeIcon {...props} size={20} />
);

export const RupeeIconLarge: React.FC<Omit<RupeeIconProps, 'size'>> = (props) => (
  <RupeeIcon {...props} size={24} />
);

export default RupeeIcon;
