import React from "react";

interface SelectionCardProps {
  id: string;
  title: string;
  subtitle?: string;
  status?: string;
  distance?: string;
  queueCount?: number;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  subtitle,
  status,
  distance,
  queueCount,
  isSelected,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-6 text-left border rounded-lg transition-all duration-200
        ${
          isSelected
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-700"
            : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600"
        }
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {subtitle}
            </p>
          )}

          <div className="flex items-center space-x-4 text-sm">
            {status && (
              <div className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    status === "Open" ? "bg-red-500" : "bg-green-500"
                  }`}
                ></span>
                <span className="text-gray-600 dark:text-gray-300">
                  {status}
                </span>
              </div>
            )}

            {distance && (
              <span className="text-gray-500 dark:text-gray-400">
                {distance}
              </span>
            )}

            {queueCount !== undefined && (
              <span className="text-gray-500 dark:text-gray-400">
                {queueCount} people in queue
              </span>
            )}
          </div>
        </div>

        {isSelected && (
          <div className="ml-4">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
};

export default SelectionCard;
