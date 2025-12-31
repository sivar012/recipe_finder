import React, { useState, useEffect } from 'react';
import { Search, Coffee, UtensilsCrossed, Cookie, Moon, Share2, Heart, Clock, ChefHat } from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './components/AuthLayout';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CategoryButton from './components/CategoryButton';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated, registering, loading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated]);

  const categories = [
    { id: 'breakfast', name: 'Breakfast', icon: Coffee },
    { id: 'lunch', name: 'Lunch', icon: UtensilsCrossed },
    { id: 'dinner', name: 'Dinner', icon: Moon },
    { id: 'snacks', name: 'Snacks', icon: Cookie },
  ];

  const allRecipes = [
    // Existing Recipes
    {
      id: 1,
      title: 'Masala Dosa',
      category: 'breakfast',
      image: 'https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__700_0_0_0_auto.jpg',
      prepTime: '45 mins',
      difficulty: 'Medium',
      region: 'South Indian',
      isVegetarian: true,
      servings: '2 servings',
      ingredients: [
        '2 cups dosa batter',
        '2 medium onions, finely chopped',
        '2 medium potatoes, boiled and mashed',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        '2 green chilies, finely chopped',
        'Curry leaves',
        'Oil for cooking',
        'Salt to taste',
      ],
      instructions: [
        'Heat oil in a pan, add mustard seeds and let them splutter.',
        'Add cumin seeds, green chilies, and curry leaves.',
        'Add chopped onions and sauté until golden brown.',
        'Add mashed potatoes, salt, and mix well. Cook for 5 minutes.',
        'Heat a dosa tawa and spread the batter in a circular motion.',
        'Add oil around the edges and cook until crispy.',
        'Place the potato mixture in the center and fold the dosa.',
        'Serve hot with coconut chutney and sambar.',
      ],
    },
    {
      id: 2,
      title: 'Chicken Biryani',
      category: 'dinner',
      image: 'https://ministryofcurry.com/wp-content/uploads/2024/06/chicken-biryani-5.jpg',
      prepTime: '1 hr 30 mins',
      difficulty: 'Hard',
      region: 'North Indian',
      isVegetarian: false,
      servings: '4 servings',
      ingredients: [
        '500g basmati rice',
        '1 kg chicken, cut into pieces',
        '2 large onions, thinly sliced',
        '2 tomatoes, chopped',
        '1 cup yogurt',
        '2 tbsp ginger-garlic paste',
        '1 tsp turmeric powder',
        '2 tsp red chili powder',
        '1 tsp garam masala',
        '4 cloves',
        '2 cinnamon sticks',
        '4 cardamom pods',
        '1 bay leaf',
        '1/2 cup fresh mint leaves',
        '1/2 cup fresh cilantro, chopped',
        '4 tbsp ghee',
        'Saffron strands soaked in 2 tbsp warm milk',
        'Salt to taste',
        'Water as needed',
      ],
      instructions: [
        'Rinse basmati rice and soak in water for 30 minutes, then drain.',
        'Heat ghee in a pan, fry sliced onions until golden brown, and set aside.',
        'In the same pan, add cloves, cinnamon, cardamom, and bay leaf. Sauté for 1 minute.',
        'Add ginger-garlic paste and cook until raw smell disappears.',
        'Add chicken pieces, turmeric, red chili powder, and salt. Cook until chicken is half-done.',
        'Stir in chopped tomatoes and yogurt, cook until oil separates.',
        'Layer half-cooked rice over the chicken mixture in a heavy-bottomed pot.',
        'Sprinkle half the fried onions, mint, cilantro, and garam masala on top.',
        'Add the remaining rice, top with remaining onions, mint, cilantro, and saffron milk.',
        'Cover tightly and cook on low heat (dum) for 30-40 minutes.',
        'Gently mix before serving with raita or salad.',
      ],
    },
    {
      id: 3,
      title: 'Pani Puri',
      category: 'snacks',
      image: 'https://www.awesomecuisine.com/wp-content/uploads/2007/11/Pani-Puri.jpg',
      prepTime: '40 mins',
      difficulty: 'Medium',
      region: 'North Indian',
      isVegetarian: true,
      servings: '6 servings',
      ingredients: [
        '20 puris (store-bought or homemade)',
        '1 cup boiled potatoes, mashed',
        '1 cup boiled chickpeas',
        '1 tsp chaat masala',
        '1 tsp roasted cumin powder',
        '1/2 tsp red chili powder',
        '1/4 cup tamarind chutney',
        '2 cups spicy mint-coriander water (pani)',
        '1 small onion, finely chopped',
        '1/4 cup fresh cilantro, chopped',
        'Salt to taste',
        '1 cup sev (optional)',
      ],
      instructions: [
        'Prepare the filling: Mix mashed potatoes, chickpeas, chaat masala, cumin powder, red chili powder, and salt.',
        'Prepare the pani: Blend mint, coriander, green chilies, and water with salt and spices to taste.',
        'Assemble: Gently crack the top of each puri with your thumb.',
        'Add a spoonful of potato-chickpea filling into each puri.',
        'Sprinkle chopped onion and a drizzle of tamarind chutney.',
        'Top with sev and cilantro if desired.',
        'Dip the filled puri into the spicy pani and serve immediately.',
      ],
    },
    {
      id: 4,
      title: 'Vegetable Pulao',
      category: 'lunch',
      image: 'https://shwetainthekitchen.com/wp-content/uploads/2017/05/IMG_3915.jpg',
      prepTime: '35 mins',
      difficulty: 'Easy',
      region: 'North Indian',
      isVegetarian: true,
      servings: '3 servings',
      ingredients: [
        '1 cup basmati rice',
        '1 large carrot, diced',
        '1/2 cup green peas',
        '1/2 cup green beans, chopped',
        '1 medium onion, sliced',
        '1 tsp cumin seeds',
        '2 cloves',
        '1 cinnamon stick',
        '2 cardamom pods',
        '1 bay leaf',
        '2 tbsp ghee',
        '1 tsp ginger paste',
        '2 cups water',
        'Salt to taste',
        '1/4 cup cashews, roasted',
        'Fresh cilantro for garnish',
      ],
      instructions: [
        'Rinse basmati rice and soak in water for 20 minutes, then drain.',
        'Heat ghee in a pan, add cumin seeds, cloves, cinnamon, cardamom, and bay leaf. Sauté for 1 minute.',
        'Add sliced onion and cook until golden brown.',
        'Stir in ginger paste and sauté for 30 seconds.',
        'Add carrots, peas, and beans, cook for 5 minutes.',
        'Add drained rice and gently stir to coat with spices.',
        'Pour in 2 cups water, add salt, and bring to a boil.',
        'Reduce heat, cover, and simmer for 15 minutes until rice is cooked.',
        'Fluff the rice, garnish with roasted cashews and cilantro, and serve hot.',
      ],
    },
    // New Breakfast Recipes
    {
      id: 5,
      title: 'Idly',
      category: 'breakfast',
      image: 'https://c1.staticflickr.com/1/577/32377860871_e6349b20c7_z.jpg',
      prepTime: '30 mins',
      difficulty: 'Easy',
      region: 'South Indian',
      isVegetarian: true,
      servings: '4 servings',
      ingredients: [
        '2 cups idli batter (fermented)',
        '1 tsp salt',
        'Water as needed',
        'Oil for greasing idli molds',
      ],
      instructions: [
        'Prepare the idli batter by fermenting a mix of urad dal and rice (or use store-bought fermented batter).',
        'Add salt to the batter and mix well. Add a little water if the batter is too thick.',
        'Grease the idli molds with a few drops of oil.',
        'Pour water into the idli steamer or pressure cooker and bring it to a boil.',
        'Pour the batter into the idli molds, filling each mold about 3/4 full.',
        'Place the idli stand in the steamer, cover, and steam for 10-12 minutes or until a toothpick inserted comes out clean.',
        'Remove the idli stand, let it cool slightly, and use a spoon to scoop out the idlis.',
        'Serve hot with coconut chutney and sambar.',
      ],
    },
    {
      id: 6,
      title: 'Chapati',
      category: 'breakfast',
      image: 'https://www.krumpli.co.uk/wp-content/uploads/2023/05/Homemade-Indian-Chapati-02-720x540.jpg',
      prepTime: '30 mins',
      difficulty: 'Easy',
      region: 'North Indian',
      isVegetarian: true,
      servings: '4 servings',
      ingredients: [
        '2 cups whole wheat flour (atta)',
        '1 tsp salt',
        'Water as needed',
        '1 tbsp oil or ghee (optional)',
      ],
      instructions: [
        'In a large bowl, mix the whole wheat flour and salt.',
        'Gradually add water and knead into a soft, pliable dough (about 5-7 minutes).',
        'Add 1 tbsp oil or ghee (optional) and knead again. Cover and let the dough rest for 15 minutes.',
        'Divide the dough into 8-10 equal portions and roll each portion into a ball.',
        'Dust a rolling surface with flour, and roll each ball into a thin, round chapati (about 6-7 inches in diameter).',
        'Heat a tawa (flat griddle) over medium heat. Place the rolled chapati on the tawa.',
        'Cook for 30 seconds or until small bubbles appear, then flip and cook the other side for 30 seconds.',
        'Apply a little ghee or oil (optional) and cook both sides until golden brown spots appear.',
        'Serve hot with curry, dal, or any side dish.',
      ],
    },
    // New Lunch Recipes
    {
      id: 7,
      title: 'Tomato Rice',
      category: 'lunch',
      image: 'https://freshcoasteats.com/wp-content/uploads/2023/09/tomato-rice-3.jpg',
      prepTime: '30 mins',
      difficulty: 'Easy',
      region: 'South Indian',
      isVegetarian: true,
      servings: '3 servings',
      ingredients: [
        '1 cup basmati rice',
        '2 large tomatoes, finely chopped',
        '1 medium onion, sliced',
        '1 tsp ginger-garlic paste',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        '2 green chilies, slit',
        '1 tsp red chili powder',
        '1/2 tsp turmeric powder',
        '1 tsp garam masala',
        '2 tbsp oil',
        'Salt to taste',
        'Fresh cilantro for garnish',
        '2 cups water',
      ],
      instructions: [
        'Rinse the basmati rice and soak in water for 20 minutes, then drain.',
        'Heat oil in a pan, add mustard seeds and cumin seeds, and let them splutter.',
        'Add sliced onions and green chilies, sauté until onions turn golden brown.',
        'Add ginger-garlic paste and cook until the raw smell disappears.',
        'Add chopped tomatoes, red chili powder, turmeric powder, and salt. Cook until tomatoes turn mushy and oil separates.',
        'Add the drained rice and garam masala, stir gently to coat the rice with the masala.',
        'Pour in 2 cups of water, bring to a boil, then reduce heat, cover, and simmer for 15 minutes until rice is cooked.',
        'Fluff the rice, garnish with fresh cilantro, and serve hot with raita or papad.',
      ],
    },
    {
      id: 8,
      title: 'Egg Rice',
      category: 'lunch',
      image: 'https://www.sharmispassions.com/wp-content/uploads/2013/04/EggFriedRice4-500x500.jpg',
      prepTime: '25 mins',
      difficulty: 'Easy',
      region: 'South Indian',
      isVegetarian: false,
      servings: '3 servings',
      ingredients: [
        '1 cup basmati rice, cooked',
        '3 eggs, beaten',
        '1 medium onion, finely chopped',
        '1 green chili, slit',
        '1 tsp ginger-garlic paste',
        '1 tsp cumin seeds',
        '1/2 tsp turmeric powder',
        '1 tsp red chili powder',
        '1 tsp garam masala',
        '2 tbsp oil',
        'Salt to taste',
        'Fresh cilantro for garnish',
      ],
      instructions: [
        'Heat 1 tbsp oil in a pan, add the beaten eggs with a pinch of salt, and scramble until fully cooked. Set aside.',
        'In the same pan, add the remaining oil and cumin seeds, let them splutter.',
        'Add chopped onions and green chili, sauté until onions turn golden brown.',
        'Add ginger-garlic paste and cook until the raw smell disappears.',
        'Add turmeric powder, red chili powder, garam masala, and salt. Mix well.',
        'Add the cooked rice and scrambled eggs, gently toss to combine all the ingredients.',
        'Cook for 2-3 minutes on low heat, stirring occasionally.',
        'Garnish with fresh cilantro and serve hot with a side of raita or pickle.',
      ],
    },
    // New Dinner Recipes
    {
      id: 9,
      title: 'Paneer Butter Masala',
      category: 'dinner',
      image: 'https://www.cookwithmanali.com/wp-content/uploads/2019/05/Paneer-Butter-Masala.jpg',
      prepTime: '40 mins',
      difficulty: 'Medium',
      region: 'North Indian',
      isVegetarian: true,
      servings: '4 servings',
      ingredients: [
        '200g paneer, cubed',
        '2 large tomatoes, pureed',
        '1 medium onion, finely chopped',
        '1 tbsp ginger-garlic paste',
        '1/2 cup cashew nuts, soaked and ground to a paste',
        '1 tsp cumin seeds',
        '1 tsp red chili powder',
        '1/2 tsp turmeric powder',
        '1 tsp garam masala',
        '1 tsp kasuri methi (dried fenugreek leaves)',
        '1/4 cup fresh cream',
        '2 tbsp butter',
        '1 tbsp oil',
        'Salt to taste',
        'Fresh cilantro for garnish',
      ],
      instructions: [
        'Heat butter and oil in a pan, add cumin seeds, and let them splutter.',
        'Add chopped onions and sauté until golden brown.',
        'Add ginger-garlic paste and cook until the raw smell disappears.',
        'Add tomato puree, red chili powder, turmeric powder, and salt. Cook until the oil separates from the masala.',
        'Add cashew paste and cook for 2-3 minutes, stirring continuously.',
        'Add 1/2 cup water, garam masala, and kasuri methi. Simmer for 5 minutes.',
        'Add paneer cubes and fresh cream, mix gently, and cook for another 2-3 minutes.',
        'Garnish with fresh cilantro and serve hot with naan or rice.',
      ],
    },
    {
      id: 10,
      title: 'Khichdi',
      category: 'dinner',
      image: 'https://foodtrails25.com/wp-content/uploads/2019/04/Yellow-Moong-Dal-Khichdi-Recipe.jpg',
      prepTime: '30 mins',
      difficulty: 'Easy',
      region: 'North Indian',
      isVegetarian: true,
      servings: '4 servings',
      ingredients: [
        '1/2 cup moong dal (split yellow lentils)',
        '1/2 cup rice',
        '1 tsp cumin seeds',
        '1 tsp ginger, grated',
        '1/2 tsp turmeric powder',
        '1 medium carrot, diced',
        '1/2 cup green peas',
        '1 medium potato, diced',
        '2 tbsp ghee',
        'Salt to taste',
        '4 cups water',
        'Fresh cilantro for garnish',
      ],
      instructions: [
        'Rinse the moong dal and rice together, then soak in water for 15 minutes, and drain.',
        'Heat ghee in a pressure cooker, add cumin seeds, and let them splutter.',
        'Add grated ginger and sauté for 30 seconds.',
        'Add diced carrots, peas, and potatoes, and sauté for 2 minutes.',
        'Add turmeric powder, soaked dal, and rice. Mix well.',
        'Add 4 cups of water and salt, stir, and close the pressure cooker lid.',
        'Cook for 3 whistles on medium heat, then let the pressure release naturally.',
        'Open the lid, stir the khichdi, and adjust consistency with more water if needed.',
        'Garnish with fresh cilantro and serve hot with ghee, pickle, or yogurt.',
      ],
    },
    // New Snacks Recipes
    {
      id: 11,
      title: 'Onion Pakoda',
      category: 'snacks',
      image: 'https://www.whiskaffair.com/wp-content/uploads/2020/07/Onion-Pakoda-2-3.jpg',
      prepTime: '25 mins',
      difficulty: 'Easy',
      region: 'North Indian',
      isVegetarian: true,
      servings: '4 servings',
      ingredients: [
        '2 large onions, thinly sliced',
        '1 cup gram flour (besan)',
        '2 tbsp rice flour',
        '1 tsp red chili powder',
        '1/2 tsp turmeric powder',
        '1 tsp cumin seeds',
        '1 tsp ajwain (carom seeds)',
        '1 green chili, finely chopped',
        '2 tbsp fresh cilantro, chopped',
        'Salt to taste',
        'Water as needed',
        'Oil for deep frying',
      ],
      instructions: [
        'In a large bowl, mix gram flour, rice flour, red chili powder, turmeric powder, cumin seeds, ajwain, green chili, cilantro, and salt.',
        'Add sliced onions and mix well to coat them with the dry mixture.',
        'Gradually add water (a few tablespoons at a time) to form a thick batter that coats the onions.',
        'Heat oil in a deep frying pan over medium heat.',
        'Drop small portions of the onion batter into the hot oil using your fingers or a spoon.',
        'Fry until golden brown and crispy, turning occasionally (about 3-4 minutes per side).',
        'Remove with a slotted spoon and drain on paper towels.',
        'Serve hot with green chutney or ketchup.',
      ],
    },
    {
      id: 12,
      title: 'Mirchi Bajji',
      category: 'snacks',
      image: 'https://binjalsvegkitchen.com/wp-content/uploads/2024/09/Mirchi-Bajji-H1.jpg',
      prepTime: '30 mins',
      difficulty: 'Medium',
      region: 'South Indian',
      isVegetarian: true,
      servings: '4 servings',
      ingredients: [
        '8 large green chilies (bajji mirchi)',
        '1 cup gram flour (besan)',
        '2 tbsp rice flour',
        '1 tsp red chili powder',
        '1/2 tsp turmeric powder',
        '1 tsp ajwain (carom seeds)',
        '1/2 tsp baking soda',
        'Salt to taste',
        'Water as needed',
        'Oil for deep frying',
        '1/2 cup tamarind paste (for stuffing, optional)',
        '1 tsp cumin powder (for stuffing, optional)',
      ],
      instructions: [
        'Slit the green chilies lengthwise and remove the seeds (optional, for less heat).',
        'If stuffing, mix tamarind paste with cumin powder and a pinch of salt, then stuff a little into each chili.',
        'In a bowl, mix gram flour, rice flour, red chili powder, turmeric powder, ajwain, baking soda, and salt.',
        'Add water gradually to form a thick batter that can coat the chilies.',
        'Heat oil in a deep frying pan over medium heat.',
        'Dip each chili into the batter, ensuring it’s fully coated, and carefully drop it into the hot oil.',
        'Fry until golden brown and crispy, turning occasionally (about 3-4 minutes per side).',
        'Remove with a slotted spoon and drain on paper towels.',
        'Serve hot with coconut chutney or a sprinkle of chaat masala.',
      ],
    },
  ];

  const toggleFavorite = (recipeId: number) => {
    if (!isAuthenticated) {
      setShowLogin(true);
      setShowRegister(false);
      return;
    }
    setFavorites(prev => 
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    setSelectedCategory('all');
    setShowFavorites(false);
  };

  const filteredRecipes = allRecipes.filter(recipe => {
    if (showFavorites) {
      return favorites.includes(recipe.id);
    }
    
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      recipe.title.toLowerCase().includes(searchQuery) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery)) ||
      recipe.region.toLowerCase().includes(searchQuery);
    
    return matchesCategory && matchesSearch;
  });

  const handleRecipeClick = (recipeId: number) => {
    setSelectedRecipe(recipeId);
  };

  const selectedRecipeData = selectedRecipe 
    ? allRecipes.find(recipe => recipe.id === selectedRecipe)
    : null;

  console.log('App render - isAuthenticated:', isAuthenticated, 'registering:', registering, 'loading:', loading, 'showLogin:', showLogin, 'showRegister:', showRegister);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (registering) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Registering...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthLayout>
        {showLogin ? (
          <Login onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }} />
        ) : (
          <Register onSwitchToLogin={() => {
            console.log('Switching to login from App');
            setShowRegister(false);
            setShowLogin(true);
          }} />
        )}
      </AuthLayout>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar 
        onShowFavorites={() => setShowFavorites(!showFavorites)}
        showingFavorites={showFavorites}
        onLoginClick={() => {
          setShowLogin(true);
          setShowRegister(false);
        }}
        onRegisterClick={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-orange-600 to-orange-400">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=2000)',
            backgroundBlendMode: 'overlay'
          }}
        ></div>
        <div className="relative flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Discover Authentic Indian Recipes
          </h1>
          <p className="text-xl mb-8 text-center max-w-2xl">
            Explore thousands of traditional recipes from every corner of India
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Categories Section */}
      {!showFavorites && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                {...category}
                selected={selectedCategory === category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSearchQuery('');
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recipes Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            {showFavorites 
              ? 'Favorite Recipes'
              : selectedCategory === 'all' 
                ? searchQuery 
                  ? `Search Results for "${searchQuery}"`
                  : 'All Recipes'
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Recipes`}
          </h2>
          {(selectedCategory !== 'all' || showFavorites) && (
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setShowFavorites(false);
                setSearchQuery('');
              }}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              View All Recipes
            </button>
          )}
        </div>
        
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {showFavorites 
                ? "You haven't added any favorites yet!"
                : searchQuery 
                  ? `No recipes found for "${searchQuery}"`
                  : "No recipes found in this category"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                {...recipe} 
                onClick={() => handleRecipeClick(recipe.id)}
                onFavorite={toggleFavorite}
                isFavorite={favorites.includes(recipe.id)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedRecipeData && (
        <RecipeModal 
          recipe={selectedRecipeData} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
    </div>
  );
}

export default App;