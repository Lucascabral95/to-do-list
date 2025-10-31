import React from 'react';

import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  color = '#3498db',
  className = ''
}) => {
  const sizeMap = {
    small: '30px',
    medium: '50px',
    large: '80px'
  };

  const spinnerSize = sizeMap[size];

  return (
    <div className={`spinner-container ${className}`}>
      <div 
        className="spinner" 
        style={{ 
          width: spinnerSize, 
          height: spinnerSize,
          borderTopColor: color 
        }}
      />
    </div>
  );
};
