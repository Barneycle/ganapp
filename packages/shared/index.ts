// Export Supabase client
export { supabase } from './supabaseClient';

// Export services
export { EventService } from './services/eventService';
export { UserService } from './services/userService';
export { FileUploadService } from './services/fileUploadService';
export { NotificationService } from './services/notificationService';

// Export types
export type { Event, EventWithDetails } from './services/eventService';
export type { User } from './services/userService';
export type { UploadResult } from './services/fileUploadService';
export type { Notification, NotificationPreferences } from './services/notificationService';
