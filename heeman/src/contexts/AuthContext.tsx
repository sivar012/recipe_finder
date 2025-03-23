import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; display_name?: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  registering: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; display_name?: string } | null>(null);
  const [registering, setRegistering] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      // Check current session
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('Initial session check:', session, 'error:', error);
      
      if (session) {
        // If a session exists, explicitly sign out to ensure a clean slate
        await supabase.auth.signOut();
        console.log('Signed out existing session during initialization');
      }
      
      // Double-check session is gone
      const { data: { session: newSession } } = await supabase.auth.getSession();
      console.log('Session after sign out:', newSession);
      
      if (!newSession) {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        console.error('Session persists after sign out:', newSession);
        setIsAuthenticated(true); // Shouldn’t happen, but log it
        setUser({
          email: newSession.user.email || '',
          display_name: newSession.user.user_metadata.display_name || '',
        });
      }
      setLoading(false);
    };
    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, 'session:', session, 'registering:', registering, 'loading:', loading);
      if (event === 'SIGNED_IN' && !registering && !loading) {
        setUser({
          email: session?.user.email || '',
          display_name: session?.user.user_metadata.display_name || '',
        });
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [registering]);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    console.log('Login successful:', data);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    console.log('Logout successful');
  };

  const register = async (email: string, password: string, name: string) => {
    setRegistering(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      });
      if (error) throw new Error(error.message);
      console.log('Sign up complete with name:', name);
      await supabase.auth.signOut();
      console.log('Sign out complete after registration');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, registering, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};