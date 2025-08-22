import { supabase } from '../supabaseClient'

export interface Event {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  venue: string
  banner_url?: string
  programme_url?: string
  materials_url?: string
  status: 'draft' | 'published' | 'cancelled'
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

      // Get sponsors and speakers for each event
      const eventsWithDetails = await Promise.all(
        events.map(async (event) => {
          const [sponsorsResult, speakersResult] = await Promise.all([
            supabase
              .from('event_sponsors')
              .select('name, logo_url')
              .eq('event_id', event.id),
            supabase
              .from('event_speakers')
              .select('name, photo_url')
              .eq('event_id', event.id)
          ])

          return {
            ...event,
            sponsors: sponsorsResult.data || [],
            speakers: speakersResult.data || []
          }
        })
      )

      return eventsWithDetails
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  }

  static async createEvent(eventData: Partial<Event>): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select('id')
        .single()

      if (error) throw error
      return data.id
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  }
}
