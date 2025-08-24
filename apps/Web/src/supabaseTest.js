// Simple test to verify Supabase connection
import { supabase } from '@ganapp/shared';

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection by getting the current user (should be null if not authenticated)
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('Supabase connection successful!');
    console.log('Current user:', user);
    return true;
  } catch (err) {
    console.error('Supabase connection failed:', err);
    return false;
  }
};
