import React from 'react';
import { X, Clock, MapPin, ChefHat, Users } from 'lucide-react';

interface RecipeModalProps {
  recipe: {
    title: string;
    image: string;
    prepTime: string;
    difficulty: string;
    region: string;
    isVegetarian: boolean;
    servings: string;
    ingredients: string[];
    instructions: string[];
  };
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-40 sm:h-48 md:h-64 object-cover rounded-t-xl"
            loading="lazy"
          />
          <button 
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1 sm:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <X className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
              <Clock className="h-3 w-3 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
              <MapPin className="h-3 w-3 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              <span>{recipe.region}</span>
            </div>
            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
              <ChefHat className="h-3 w-3 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              <span>{recipe.difficulty}</span>
            </div>
            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
              <Users className="h-3 w-3 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              <span>{recipe.servings}</span>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-4">Ingredients</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-1 sm:mr-2"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-4">Instructions</h3>
            <ol className="space-y-2 sm:space-y-4 text-xs sm:text-sm">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="font-bold text-orange-500 mr-2 sm:mr-4">{index + 1}.</span>
                  <p className="text-gray-700">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;