import React from "react";
import DarkModeToggle from "./DarkModeToggle";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`px-8 pt-8 pb-6 border-b border-gray-100 dark:border-gray-700 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h1>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-300 text-sm">{subtitle}</p>
          )}
        </div>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Header; 