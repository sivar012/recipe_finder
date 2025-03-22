import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryButtonProps {
  id: string;
  name: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ name, icon: Icon, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl transition-all
        ${selected 
          ? 'bg-orange-500 text-white shadow-lg scale-105' 
          : 'bg-white text-gray-700 hover:bg-orange-100'}
      `}
    >
      <Icon className={`h-6 w-6 sm:h-8 sm:w-8 mb-1 sm:mb-2 ${selected ? 'text-white' : 'text-orange-500'}`} />
      <span className="font-medium text-xs sm:text-base">{name}</span>
    </button>
  );
};

export default CategoryButton;