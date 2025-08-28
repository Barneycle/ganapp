import { supabase } from '../supabaseClient'

export interface Survey {
  id: string
  event_id: string
  title: string
  description?: string
  is_active: boolean
  created_by: string
  questions: any[] // JSONB array of question objects
  created_at: string
  updated_at: string
}

export interface SurveyQuestion {
  id: string
  type: 'text' | 'multiple_choice' | 'rating' | 'yes_no'
  question: string
  required: boolean
  options?: string[] // For multiple choice questions
  min_rating?: number // For rating questions
  max_rating?: number // For rating questions
}

export class SurveyService {
  static async createSurvey(surveyData: Partial<Survey>): Promise<string> {
    try {
      console.log('🔍 SurveyService: Starting survey creation...');
      console.log('🔍 SurveyService: Survey data received:', surveyData);
      
      // Verify user is authenticated
      console.log('🔍 SurveyService: Checking authentication...');
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('❌ SurveyService: Auth error:', authError);
        throw new Error(`Authentication error: ${authError.message}`);
      }
      
      if (!user) {
        console.error('❌ SurveyService: No user found');
        throw new Error('Authentication required to create surveys');
      }

      console.log('🔍 SurveyService: User authenticated:', user.id);

      // Verify required fields
      if (!surveyData.event_id) {
        throw new Error('Event ID is required');
      }
      if (!surveyData.questions || !Array.isArray(surveyData.questions)) {
        throw new Error('Questions array is required');
      }
      if (!surveyData.created_by || surveyData.created_by !== user.id) {
        throw new Error('Invalid user ID for survey creation');
      }

      // Set default values
      const surveyToCreate = {
        ...surveyData,
        title: surveyData.title || 'Event Survey',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('🔍 SurveyService: Inserting survey into database...');
      
      const { data, error } = await supabase
        .from('surveys')
        .insert([surveyToCreate])
        .select('id')
        .single()

      if (error) {
        console.error('❌ SurveyService: Database insert error:', error);
        throw error;
      }
      
      console.log('✅ SurveyService: Survey created successfully:', data.id);
      return data.id
    } catch (error) {
      console.error('❌ SurveyService: Error creating survey:', error)
      throw error
    }
  }

  static async getSurveysByEvent(eventId: string): Promise<Survey[]> {
    try {
      const { data: surveys, error } = await supabase
        .from('surveys')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return surveys || []
    } catch (error) {
      console.error('Error fetching surveys:', error)
      throw error
    }
  }

  static async getSurveyById(surveyId: string): Promise<Survey | null> {
    try {
      const { data: survey, error } = await supabase
        .from('surveys')
        .select('*')
        .eq('id', surveyId)
        .single()

      if (error) throw error
      return survey
    } catch (error) {
      console.error('Error fetching survey:', error)
      throw error
    }
  }

  static async updateSurvey(surveyId: string, updates: Partial<Survey>): Promise<void> {
    try {
      const { error } = await supabase
        .from('surveys')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', surveyId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating survey:', error)
      throw error
    }
  }

  static async deleteSurvey(surveyId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('surveys')
        .delete()
        .eq('id', surveyId)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting survey:', error)
      throw error
    }
  }
}
