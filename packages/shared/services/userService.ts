import { supabase } from '../supabaseClient'

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  user_type: 'psu-student' | 'psu-employee' | 'outside'
  role: 'participant' | 'organizer' | 'admin'
  created_at: string
  updated_at: string
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
      const { error } = await supabase.auth.signOut()
      return { error: error?.message || null }
    } catch (error) {
      console.error('Error signing out:', error)
      return { error: 'An unexpected error occurred' }
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

  // Admin function to update user metadata (user_type and role)
  static async updateUserMetadata(userId: string, updates: Partial<Pick<User, 'user_type' | 'role' | 'first_name' | 'last_name'>>): Promise<{ success: boolean; error?: string }> {
    try {
      // This requires admin privileges - should be called from a secure admin endpoint
      const { data, error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: updates
      });

      if (error) {
        console.error('Error updating user metadata:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating user metadata:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Get all users (admin function)
  static async getAllUsers(): Promise<User[]> {
    try {
      // This requires admin privileges - should be called from a secure admin endpoint
      const { data, error } = await supabase.auth.admin.listUsers();

      if (error) {
        console.error('Error fetching users:', error);
        return [];
      }

      // Transform the data to match our User interface
      return data.users.map(user => ({
        id: user.id,
        email: user.email!,
        first_name: user.user_metadata?.first_name || '',
        last_name: user.user_metadata?.last_name || '',
        user_type: user.user_metadata?.user_type || 'outside',
        role: user.user_metadata?.role || 'participant',
        created_at: user.created_at,
        updated_at: user.updated_at
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
}
