import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  type = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  className = '',
  icon = null
}) => {
  return (
    <button 
      className={`btn btn-${type} btn-${size} ${className}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
      {icon && <span className="btn-icon">{icon}</span>}
    </button>
  );
};

export default Button;
