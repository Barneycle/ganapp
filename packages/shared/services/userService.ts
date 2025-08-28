import { supabase } from '../supabaseClient'

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  user_type: 'psu-student' | 'psu-employee' | 'outside'
  role: 'participant' | 'organizer' | 'admin'
  created_at: string
  updated_at: string | undefined
}

export interface AuthResponse {
  user: User | null
  error: string | null
  message?: string
}

export class UserService {
  static async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { user: null, error: error.message }
      }

      if (data.user) {
        // Get user data from Supabase Auth metadata
        const userMetadata = data.user.user_metadata;
        
        const userData = {
          id: data.user.id,
          email: data.user.email!,
          first_name: userMetadata.first_name,
          last_name: userMetadata.last_name,
          user_type: userMetadata.user_type,
          role: userMetadata.role || 'participant',
          created_at: data.user.created_at,
          updated_at: data.user.updated_at
        };

        return { user: userData, error: null }
      }

      return { user: null, error: 'Authentication failed' }
    } catch (error) {
      console.error('Error signing in:', error)
      return { user: null, error: 'An unexpected error occurred' }
    }
  }

  static async signUp(email: string, password: string, userData: Partial<User>): Promise<AuthResponse> {
    try {
      // Only validate PSU email format for PSU students and employees
      if (userData.user_type === 'psu-student' || userData.user_type === 'psu-employee') {
        const psuEmailRegex = /^[A-Za-z0-9._%+-]+@(parsu\.edu\.ph|[A-Za-z0-9._%+-]+\.pbox\.parsu\.edu\.ph)$/;
        if (!psuEmailRegex.test(email)) {
          return { 
            user: null, 
            error: 'Invalid email format. PSU users must use @parsu.edu.ph or .pbox@parsu.edu.ph email addresses.' 
          };
        }
      }

      // Create user in Supabase Auth with metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            user_type: userData.user_type,
            role: userData.role || 'participant'
          }
        }
      });

      if (error) {
        // Provide more helpful error messages for email validation issues
        if (error.message.includes('invalid') && error.message.includes('email')) {
          if (userData.user_type === 'psu-student' || userData.user_type === 'psu-employee') {
            return { 
              user: null, 
              error: 'Email validation failed. Please ensure you\'re using a valid PSU email address (@parsu.edu.ph or .pbox@parsu.edu.ph).' 
            };
          } else {
            return { 
              user: null, 
              error: 'Email validation failed. Please ensure you\'re using a valid email address.' 
            };
          }
        }
        return { user: null, error: error.message }
      }

      if (data.user) {
        // Return the user with metadata
        const userWithMetadata = {
          id: data.user.id,
          email: data.user.email!,
          first_name: userData.first_name!,
          last_name: userData.last_name!,
          user_type: userData.user_type!,
          role: userData.role || 'participant',
          created_at: data.user.created_at,
          updated_at: data.user.updated_at
        };

        return { 
          user: userWithMetadata, 
          error: null,
          message: 'Registration successful! Please sign in with your new account.'
        }
      }

      return { user: null, error: 'Registration failed' }
    } catch (error) {
      console.error('Error signing up:', error)
      return { user: null, error: 'An unexpected error occurred' }
    }
  }

  static async signOut(): Promise<{ error: string | null }> {
    try {
      console.log('🔄 UserService: Starting Supabase signOut...');
      
      // Get current session before signing out with timeout
      let session = null;
      try {
        const getSessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('getSession timeout after 2 seconds')), 2000)
        );
        
        const sessionResult = await Promise.race([getSessionPromise, timeoutPromise]) as any;
        session = sessionResult?.data?.session;
        console.log('🔄 UserService: Current session before signOut:', session ? 'exists' : 'none');
      } catch (timeoutError) {
        console.warn('⚠️ UserService: getSession timed out, proceeding with cleanup');
        session = null;
      }
      
      // Try Supabase signOut with a very short timeout (3 seconds)
      let supabaseResult = null;
      try {
        const signOutPromise = supabase.auth.signOut();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Supabase signOut timeout after 3 seconds')), 3000)
        );
        
        supabaseResult = await Promise.race([signOutPromise, timeoutPromise]) as any;
        console.log('🔄 UserService: Supabase signOut result:', supabaseResult?.error ? `error: ${supabaseResult.error.message}` : 'success');
      } catch (timeoutError) {
        console.warn('⚠️ UserService: Supabase signOut timed out, proceeding with manual cleanup');
        supabaseResult = { error: { message: 'timeout' } };
      }
      
      // Always proceed with manual cleanup regardless of Supabase result
      console.log('🔄 UserService: Proceeding with manual cleanup...');
      
      try {
        // Clear ALL Supabase-related storage
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
            keysToRemove.push(key);
          }
        }
        
        keysToRemove.forEach(key => {
          localStorage.removeItem(key);
          console.log('🗑️ UserService: Removed localStorage key:', key);
        });
        
        // Clear session storage as well
        const sessionKeysToRemove = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
            sessionKeysToRemove.push(key);
          }
        }
        
        sessionKeysToRemove.forEach(key => {
          sessionStorage.removeItem(key);
          console.log('🗑️ UserService: Removed sessionStorage key:', key);
        });
        
        // Note: Cookie clearing removed for React Native compatibility
        // Cookies are not available in React Native environment
        
        console.log('🔄 UserService: Manual cleanup completed');
      } catch (cleanupError) {
        console.warn('⚠️ UserService: Manual cleanup failed:', cleanupError);
      }
      
      // Verify session is cleared with timeout
      try {
        const verifySessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('verify session timeout after 2 seconds')), 2000)
        );
        
        const { data: { session: sessionAfter } } = await Promise.race([verifySessionPromise, timeoutPromise]) as any;
        console.log('🔄 UserService: Session after cleanup:', sessionAfter ? 'still exists' : 'cleared');
        
        if (sessionAfter) {
          console.warn('⚠️ UserService: Session still exists after cleanup, this might indicate a deeper issue');
        }
      } catch (verifyError) {
        console.log('🔄 UserService: Could not verify session status (expected after cleanup)');
      }
      
      return { error: null };
    } catch (error) {
      console.error('❌ UserService: SignOut exception:', error);
      return { error: 'An unexpected error occurred' };
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return null

      // Get user data from Supabase Auth metadata
      const userMetadata = user.user_metadata;
      
      const userData = {
        id: user.id,
        email: user.email!,
        first_name: userMetadata.first_name,
        last_name: userMetadata.last_name,
        user_type: userMetadata.user_type,
        role: userMetadata.role || 'participant',
        created_at: user.created_at,
        updated_at: user.updated_at
      };

      return userData
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  // Note: Admin functions like getAllUsers and updateUserMetadata require server-side implementation
  // with service role key. These cannot be called from the client-side Supabase SDK.
  // 
  // To implement admin functionality, you need to:
  // 1. Create a server-side API endpoint (e.g., Next.js API route, Express endpoint)
  // 2. Use the service role key on the server
  // 3. Call these endpoints from the client instead of direct Supabase calls
  //
  // Example server endpoint structure:
  // POST /api/admin/users - Get all users
  // PUT /api/admin/users/:id - Update user metadata
  // DELETE /api/admin/users/:id - Delete user
}
