import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="w-full max-w-2xl relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for recipes, ingredients, or cuisine..."
          className="w-full px-6 py-4 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors">
          <Search className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar