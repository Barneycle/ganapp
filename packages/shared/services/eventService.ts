import { supabase } from '../supabaseClient'

export interface Event {
  id: string
  title: string
  rationale?: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  venue?: string
  venue_address?: string
  max_participants?: number
  current_participants?: number
  banner_url?: string
  programme_url?: string
  materials_url?: string
  event_kits_url?: string
  sponsor_logos_url?: string
  speaker_photos_url?: string
  sponsors?: Array<{ name: string; logo_url?: string }>
  guest_speakers?: Array<{ name: string; photo_url?: string }>
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  category?: string
  tags?: string[]
  is_featured?: boolean
  registration_deadline?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface EventWithDetails extends Event {
  sponsors?: Array<{ name: string; logo_url?: string }>
  speakers?: Array<{ name: string; photo_url?: string }>
}

export class EventService {
  static async getPublishedEvents(): Promise<EventWithDetails[]> {
    try {
      const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .order('start_date', { ascending: true })

      if (error) throw error

      // Since sponsors and speakers are now stored as JSONB in the events table
      // we don't need to join with separate tables
      return events.map(event => ({
        ...event,
        sponsors: event.sponsors || [],
        speakers: event.guest_speakers || []
      }))
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  }

  static async createEvent(eventData: Partial<Event>): Promise<string> {
    try {
      console.log('🔍 EventService: Starting event creation...');
      console.log('🔍 EventService: Event data received:', eventData);
      
      // Verify user is authenticated and has permission
      console.log('🔍 EventService: Checking authentication...');
      
      // Simple authentication check with timeout
      console.log('🔍 EventService: Checking authentication...');
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('❌ EventService: Auth error:', authError);
        throw new Error(`Authentication error: ${authError.message}`);
      }
      
      if (!user) {
        console.error('❌ EventService: No user found');
        throw new Error('Authentication required to create events');
      }

      console.log('🔍 EventService: User authenticated:', user.id);

      // Check if the user has admin or organizer role
      if (!eventData.created_by || eventData.created_by !== user.id) {
        console.error('❌ EventService: User ID mismatch:', { 
          provided: eventData.created_by, 
          actual: user.id 
        });
        throw new Error('Invalid user ID for event creation');
      }

      console.log('🔍 EventService: User permissions verified, inserting event...');
      
            // Insert event into database
      console.log('🔍 EventService: Inserting event into database...');
      console.log('🔍 EventService: Database operation starting...');
      
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select('id')
        .single();
      
      console.log('🔍 EventService: Database operation completed');
      
      if (error) {
        console.error('❌ EventService: Database insert error:', error);
        console.log('🔍 EventService: Error details:', error);
        throw error;
      }
      
      console.log('✅ EventService: Event created successfully:', data.id);
      console.log('🔍 EventService: Event data returned:', data);
      return data.id
    } catch (error) {
      console.error('❌ EventService: Error creating event:', error)
      throw error
    }
  }

  // File upload helper method
  static async uploadFile(file: File, bucket: string, path: string): Promise<string> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(path)

      return publicUrl
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  // Get events created by a specific user
  static async getUserEvents(userId: string): Promise<Event[]> {
    try {
      const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .eq('created_by', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return events || []
    } catch (error) {
      console.error('Error fetching user events:', error)
      throw error
    }
  }

  // Update event status
  static async updateEventStatus(eventId: string, status: Event['status']): Promise<void> {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', eventId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating event status:', error)
      throw error
    }
  }

  // Check if user has permission to create events
  static async canCreateEvents(userId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || user.id !== userId) {
        return false;
      }

      // Get user role from metadata
      const userRole = user.user_metadata?.role;
      return userRole === 'admin' || userRole === 'organizer';
    } catch (error) {
      console.error('Error checking user permissions:', error);
      return false;
    }
  }
}
