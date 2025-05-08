import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  variant = 'default', 
  className = '',
  onClick = null,
  hover = true 
}) => {
  return (
    <div 
      className={`card card-${variant} ${hover ? 'card-hover' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

// Card.Title, Card.Body, and Card.Footer subcomponents for better organization
Card.Title = ({ children, className = '' }) => (
  <div className={`card-title ${className}`}>{children}</div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`card-body ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`card-footer ${className}`}>{children}</div>
);
