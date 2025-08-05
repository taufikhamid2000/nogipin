import React from "react";

interface ActionButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  backText?: string;
  nextText?: string;
  disabled?: boolean;
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBack,
  onNext,
  backText = "Kembali",
  nextText = "Seterusnya",
  disabled = false,
  className = ""
}) => {
  return (
    <div className={`px-8 py-6 border-t border-gray-100 dark:border-gray-700 flex justify-between ${className}`}>
      {onBack && (
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {backText}
        </button>
      )}
      
      {onNext && (
        <button
          onClick={onNext}
          disabled={disabled}
          className={`
            px-6 py-2 rounded-md transition-colors
            ${disabled
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }
          `}
        >
          {nextText}
        </button>
      )}
    </div>
  );
};

export default ActionButtons; 