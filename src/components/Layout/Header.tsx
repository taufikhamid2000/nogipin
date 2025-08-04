import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`px-8 pt-8 pb-6 border-b border-gray-100 ${className}`}>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>
      {subtitle && (
        <p className="text-gray-600 text-sm">{subtitle}</p>
      )}
    </div>
  );
};

export default Header; 