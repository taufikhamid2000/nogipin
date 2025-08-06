import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  return (
    <nav className={`px-4 sm:px-6 lg:px-8 pt-6 pb-4 ${className}`}>
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center min-w-0">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {item.href || item.onClick ? (
              <button
                onClick={item.onClick}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors truncate max-w-xs sm:max-w-none"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-gray-500 dark:text-gray-400 truncate max-w-xs sm:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
