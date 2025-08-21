import { supabase } from '../supabaseClient';

export interface Event {
  id: string;
  title: string;
  description?: string;
  rationale?: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  venue?: string;
  banner_url?: string;
  programme_url?: string;
  materials_url?: string;
  certificate_template_url?: string;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface EventWithDetails extends Event {
  sponsors?: Array<{ name: string; logo_url?: string }>;
  speakers?: Array<{ name: string; bio?: string; photo_url?: string }>;
}

export class EventService {
  // Get all published events
  static async getPublishedEvents(): Promise<EventWithDetails[]> {
    try {
      const { data: events, error } = await supabase
        .from('events')
        .select(`
          *,
          sponsors:event_sponsors(name, logo_url),
          speakers:event_speakers(name, bio, photo_url)
        `)
        .eq('status', 'published')
        .order('start_date', { ascending: true });

      if (error) throw error;
      return events || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  // Get event by ID
  static async getEventById(id: string): Promise<EventWithDetails | null> {
    try {
      const { data: event, error } = await supabase
        .from('events')
        .select(`
          *,
          sponsors:event_sponsors(name, logo_url),
          speakers:event_speakers(name, bio, photo_url)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return event;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  }

  // Create new event
  static async createEvent(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select('id')
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  }

  // Update event
  static async updateEvent(id: string, updates: Partial<Event>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating event:', error);
      return false;
    }
  }

  // Delete event
  static async deleteEvent(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  }
}
