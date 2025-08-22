import { supabase } from '../supabaseClient'

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
  read: boolean
  action_url?: string
  created_at: string
}

export interface NotificationPreferences {
  user_id: string
  email_notifications: boolean
  push_notifications: boolean
  event_reminders: boolean
  survey_notifications: boolean
}

export class NotificationService {
  static async getUserNotifications(userId: string, limit: number = 20): Promise<Notification[]> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return []
    }
  }

  static async getUnreadCount(userId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('read', false)

      if (error) throw error
      return count || 0
    } catch (error) {
      console.error('Error fetching unread count:', error)
      return 0
    }
  }

  static async markAsRead(notificationId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)

      if (error) throw error
    } catch (error) {
      console.error('Error marking notification as read:', error)
      throw error
    }
  }

  static async markAllAsRead(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false)

      if (error) throw error
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      throw error
    }
  }

  static subscribeToNotifications(userId: string, callback: (notification: Notification) => void): void {
    const subscription = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new as Notification)
        }
      )
      .subscribe()

    // Store subscription for cleanup
    ;(subscription as any).userId = userId
  }

  static unsubscribeFromNotifications(userId: string): void {
    // This would need to be implemented with proper subscription management
    console.log('Unsubscribing from notifications for user:', userId)
  }
}
