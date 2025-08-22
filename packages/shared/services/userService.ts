import { supabase } from '../supabaseClient'

export interface User {
  id: string
  email: string
  username: string
  first_name: string
  last_name: string
  user_type: 'psu-student' | 'psu-employee' | 'outside'
  organization?: string
  position?: string
  role: 'participant' | 'organizer' | 'admin'
  created_at: string
  updated_at: string
}

export class UserService {
  static async createUser(userData: Partial<User>): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }
}
