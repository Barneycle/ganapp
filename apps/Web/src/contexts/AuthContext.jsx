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
        // Check if we recently signed out before getting the session
        const signoutTimestamp = sessionStorage.getItem('signout-timestamp');
        const isRecentSignout = signoutTimestamp && (Date.now() - parseInt(signoutTimestamp)) < 30000;
        
        if (isRecentSignout) {
          console.log('⚠️ AuthContext: Recent sign out detected, skipping initial session check');
          // Force clear any existing session
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }
        
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
        console.log('🔄 AuthContext: Auth state changed:', event, session);
        
        // Check if this is a recent sign out (within last 30 seconds)
        const signoutTimestamp = sessionStorage.getItem('signout-timestamp');
        const isRecentSignout = signoutTimestamp && (Date.now() - parseInt(signoutTimestamp)) < 30000;
        
        // Clean up old signout timestamp
        if (signoutTimestamp && !isRecentSignout) {
          sessionStorage.removeItem('signout-timestamp');
        }
        
        if (event === 'INITIAL_SESSION' && session) {
          if (isRecentSignout) {
            console.log('⚠️ AuthContext: Ignoring INITIAL_SESSION after recent sign out');
            // Force sign out again
            await supabase.auth.signOut();
            return;
          }
        } else if (event === 'SIGNED_IN' && session) {
          if (isRecentSignout) {
            console.log('⚠️ AuthContext: Ignoring automatic sign in after recent sign out');
            // Force sign out again
            await supabase.auth.signOut();
            return;
          }
          
          console.log('🔄 AuthContext: User signed in, fetching user data...');
          // Fetch additional user data from our users table
          const userData = await UserService.getCurrentUser();
          console.log('🔄 AuthContext: Fetched user data:', userData);
          setUser(userData);
          setError(null);
        } else if (event === 'SIGNED_OUT') {
          console.log('🔄 AuthContext: User signed out, clearing user state...');
          setUser(null);
          setError(null);
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('🔄 AuthContext: Token refreshed');
        } else if (event === 'USER_UPDATED') {
          console.log('🔄 AuthContext: User updated');
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Get redirect path based on user role only
  const getRedirectPath = (user) => {
    if (!user) return '/';
    
    console.log('getRedirectPath called with user:', user);
    console.log('User role:', user.role);
    console.log('User type:', user.user_type);
    
    // Only use the role field for redirection
    if (user.role === 'admin') {
      console.log('Redirecting admin to /admin');
      return '/admin';
    } else if (user.role === 'organizer') {
      console.log('Redirecting organizer to /organizer');
      return '/organizer';
    } else if (user.role === 'participant') {
      console.log('Redirecting participant to /participants');
      return '/participants';
    }
    
    // If no role is set, default to home
    console.log('No role found, redirecting to /');
    return '/';
  };

  // Sign in function with email
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await UserService.signIn(email, password);
      
      if (result.user) {
        setUser(result.user);
        setLoading(false);
        const redirectPath = getRedirectPath(result.user);
        return { success: true, user: result.user, redirectPath };
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
      console.log('🔄 AuthContext: Starting sign out process...');
      console.log('🔄 AuthContext: Current user:', user);
      console.log('🔄 AuthContext: User role:', user?.role);
      
      setLoading(true);
      setError(null); // Clear any previous errors
      
      // Clear user state first
      setUser(null);
      
      // Add timeout to prevent hanging
      const signOutPromise = UserService.signOut();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Sign out timeout after 15 seconds')), 15000)
      );
      
      let result;
      try {
        result = await Promise.race([signOutPromise, timeoutPromise]);
        console.log('🔄 AuthContext: UserService signOut result:', result);
      } catch (timeoutError) {
        console.warn('⚠️ AuthContext: Sign out timed out, forcing user state clear');
        result = { error: 'Sign out timed out' };
      }
      
      if (result.error) {
        console.error('❌ AuthContext: Sign out error from UserService:', result.error);
        setError(result.error);
        setLoading(false);
        return { success: false, error: result.error };
      }

      // Double-check user state is cleared
      setUser(null);
      setLoading(false);
      
      // Add a flag to prevent automatic session restoration
      sessionStorage.setItem('signout-timestamp', Date.now().toString());
      
      console.log('✅ AuthContext: Sign out completed successfully');
      return { success: true };
    } catch (err) {
      console.error('❌ AuthContext: Sign out exception:', err);
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
    getRedirectPath,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

