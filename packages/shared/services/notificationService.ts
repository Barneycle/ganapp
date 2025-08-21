import { supabase } from '../supabaseClient';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  action_url?: string;
  created_at: string;
}

export interface NotificationPreferences {
  user_id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  event_updates: boolean;
  survey_reminders: boolean;
  check_in_confirmations: boolean;
}

export class NotificationService {
  private static subscriptions: Map<string, any> = new Map();

  // Subscribe to real-time notifications for a user
  static subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    // Unsubscribe from existing subscription if any
    if (this.subscriptions.has(userId)) {
      this.subscriptions.get(userId).unsubscribe();
    }

    // Subscribe to new notifications
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
          callback(payload.new as Notification);
        }
      )
      .subscribe();

    this.subscriptions.set(userId, subscription);
    return subscription;
  }

  // Unsubscribe from notifications
  static unsubscribeFromNotifications(userId: string) {
    if (this.subscriptions.has(userId)) {
      this.subscriptions.get(userId).unsubscribe();
      this.subscriptions.delete(userId);
    }
  }

  // Get all notifications for a user
  static async getUserNotifications(userId: string, limit = 50): Promise<Notification[]> {
    try {
      const { data: notifications, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return notifications || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  // Get unread notifications count
  static async getUnreadCount(userId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      return 0;
    }
  }

  // Mark notification as read
  static async markAsRead(notificationId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  // Mark all notifications as read for a user
  static async markAllAsRead(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }

  // Create a new notification
  static async createNotification(notification: Omit<Notification, 'id' | 'created_at'>): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([notification])
        .select('id')
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating notification:', error);
      return null;
    }
  }

  // Create event-related notifications
  static async notifyEventRegistration(userId: string, eventTitle: string, eventId: string): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: 'Event Registration Confirmed',
      message: `You have successfully registered for "${eventTitle}"`,
      type: 'success',
      read: false,
      action_url: `/events/${eventId}`
    });
  }

  static async notifyEventReminder(userId: string, eventTitle: string, eventId: string, eventDate: string): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: 'Event Reminder',
      message: `Don't forget! "${eventTitle}" is tomorrow (${eventDate})`,
      type: 'info',
      read: false,
      action_url: `/events/${eventId}`
    });
  }

  static async notifyCheckIn(userId: string, eventTitle: string, eventId: string): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: 'Check-in Successful',
      message: `You have been checked in for "${eventTitle}"`,
      type: 'success',
      read: false,
      action_url: `/events/${eventId}`
    });
  }

  static async notifySurveyCompletion(userId: string, eventTitle: string, eventId: string): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: 'Survey Completed',
      message: `Thank you for completing the survey for "${eventTitle}"`,
      type: 'success',
      read: false,
      action_url: `/events/${eventId}`
    });
  }

  // Create organizer notifications
  static async notifyOrganizerEventCreated(userId: string, eventTitle: string, eventId: string): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: 'Event Created Successfully',
      message: `Your event "${eventTitle}" has been created and is now in draft status`,
      type: 'success',
      read: false,
      action_url: `/organizer/events/${eventId}`
    });
  }

  static async notifyOrganizerNewParticipant(userId: string, eventTitle: string, participantName: string, eventId: string): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: 'New Event Participant',
      message: `${participantName} has registered for "${eventTitle}"`,
      type: 'info',
      read: false,
      action_url: `/organizer/events/${eventId}/participants`
    });
  }

  static async notifyOrganizerSurveyResponse(userId: string, eventTitle: string, eventId: string): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: 'New Survey Response',
      message: `A new survey response has been submitted for "${eventTitle}"`,
      type: 'info',
      read: false,
      action_url: `/organizer/events/${eventId}/surveys`
    });
  }

  // Create admin notifications
  static async notifyAdminNewEvent(userId: string, eventTitle: string, organizerName: string, eventId: string): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: 'New Event Pending Approval',
      message: `${organizerName} has created a new event: "${eventTitle}"`,
      type: 'warning',
      read: false,
      action_url: `/admin/events/${eventId}`
    });
  }

  static async notifyAdminEventApproved(userId: string, eventTitle: string, eventId: string): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: 'Event Approved',
      message: `Your event "${eventTitle}" has been approved by an administrator`,
      type: 'success',
      read: false,
      action_url: `/organizer/events/${eventId}`
    });
  }

  // Delete notification
  static async deleteNotification(notificationId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return false;
    }
  }

  // Get notification preferences for a user
  static async getNotificationPreferences(userId: string): Promise<NotificationPreferences | null> {
    try {
      const { data: preferences, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return preferences;
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      return null;
    }
  }

  // Update notification preferences
  static async updateNotificationPreferences(userId: string, preferences: Partial<NotificationPreferences>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notification_preferences')
        .upsert([{ user_id: userId, ...preferences }]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      return false;
    }
  }

  // Send bulk notifications to multiple users
  static async sendBulkNotifications(userIds: string[], notification: Omit<Notification, 'id' | 'created_at' | 'user_id'>): Promise<number> {
    try {
      const notifications = userIds.map(userId => ({
        ...notification,
        user_id: userId
      }));

      const { data, error } = await supabase
        .from('notifications')
        .insert(notifications);

      if (error) throw error;
      return data?.length || 0;
    } catch (error) {
      console.error('Error sending bulk notifications:', error);
      return 0;
    }
  }
}
