import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, UserService } from '@ganapp/shared';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get initial session
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setError(error.message);
        } else if (session) {
          // Fetch additional user data from our users table
          const userData = await UserService.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Session error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (event === 'SIGNED_IN' && session) {
          // Fetch additional user data from our users table
          const userData = await UserService.getCurrentUser();
          setUser(userData);
          setError(null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setError(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sign in function with email
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await UserService.signIn(email, password);
      
      if (result.user) {
        setUser(result.user);
        setLoading(false);
        return { success: true, user: result.user };
      } else {
        setError(result.error);
        setLoading(false);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred');
      setLoading(false);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Sign up function
  const signUp = async (email, password, userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await UserService.signUp(email, password, userData);
      
      if (result.user) {
        setUser(result.user);
        setLoading(false);
        return { success: true, user: result.user, message: result.message };
      } else {
        setError(result.error);
        setLoading(false);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setError('An unexpected error occurred');
      setLoading(false);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const result = await UserService.signOut();
      
      if (result.error) {
        setError(result.error);
        setLoading(false);
        return { success: false, error: result.error };
      }

      setUser(null);
      setLoading(false);
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Get current user function
  const getCurrentUser = () => {
    return user;
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
    getCurrentUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
