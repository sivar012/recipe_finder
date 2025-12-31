import React from 'react';
import { Clock, MapPin, Heart, Share2 } from 'lucide-react';

interface RecipeCardProps {
  id: number;
  title: string;
  image: string;
  prepTime: string;
  difficulty: string;
  region: string;
  isVegetarian: boolean;
  onClick: () => void;
  onFavorite: (id: number) => void;
  isFavorite: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  prepTime,
  difficulty,
  region,
  isVegetarian,
  onClick,
  onFavorite,
  isFavorite,
}) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button 
            className={`p-2 rounded-full shadow hover:scale-110 transition-transform ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(id);
            }}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button 
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              // Handle share
            }}
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isVegetarian ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {isVegetarian ? 'Veg' : 'Non-Veg'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span className="mr-4">{prepTime}</span>
          <MapPin className="h-4 w-4 mr-1" />
          <span>{region}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Difficulty: {difficulty}</span>
          <button 
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard