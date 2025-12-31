import React from 'react';
import { Heart, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onShowFavorites: () => void;
  showingFavorites: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onShowFavorites, showingFavorites, onLoginClick, onRegisterClick }) => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-orange-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Recipe App</div>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={onShowFavorites}
              className={`flex items-center space-x-1 ${showingFavorites ? 'text-yellow-300' : 'text-white'} hover:text-yellow-300`}
            >
              <Heart size={20} />
              <span>Favorites</span>
            </button>
            <span className="text-sm">
              Welcome, {user?.display_name || 'User'} {/* Display name instead of email */}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:text-yellow-300"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <button onClick={onLoginClick} className="hover:text-yellow-300">
              Login
            </button>
            <button onClick={onRegisterClick} className="hover:text-yellow-300">
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;