import { supabase } from '../supabaseClient';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  path?: string;
}

export class FileUploadService {
  // Upload event banner image
  static async uploadEventBanner(file: File, eventId: string): Promise<UploadResult> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${eventId}/banner.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { data, error } = await supabase.storage
        .from('ganapp-storage')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('ganapp-storage')
        .getPublicUrl(filePath);

      return {
        success: true,
        url: urlData.publicUrl,
        path: filePath
      };
    } catch (error) {
      console.error('Error uploading event banner:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload banner'
      };
    }
  }

  // Upload event materials (PDF, DOC, etc.)
  static async uploadEventMaterials(file: File, eventId: string, type: 'programme' | 'materials' | 'certificate'): Promise<UploadResult> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${eventId}/${type}.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { data, error } = await supabase.storage
        .from('ganapp-storage')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('ganapp-storage')
        .getPublicUrl(filePath);

      return {
        success: true,
        url: urlData.publicUrl,
        path: filePath
      };
    } catch (error) {
      console.error('Error uploading event materials:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload materials'
      };
    }
  }

  // Upload sponsor logos
  static async uploadSponsorLogo(file: File, eventId: string, sponsorName: string): Promise<UploadResult> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${eventId}/sponsors/${sponsorName.toLowerCase().replace(/\s+/g, '-')}.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { data, error } = await supabase.storage
        .from('ganapp-storage')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('ganapp-storage')
        .getPublicUrl(filePath);

      return {
        success: true,
        url: urlData.publicUrl,
        path: filePath
      };
    } catch (error) {
      console.error('Error uploading sponsor logo:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload sponsor logo'
      };
    }
  }

  // Upload speaker photos
  static async uploadSpeakerPhoto(file: File, eventId: string, speakerName: string): Promise<UploadResult> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${eventId}/speakers/${speakerName.toLowerCase().replace(/\s+/g, '-')}.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { data, error } = await supabase.storage
        .from('ganapp-storage')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('ganapp-storage')
        .getPublicUrl(filePath);

      return {
        success: true,
        url: urlData.publicUrl,
        path: filePath
      };
    } catch (error) {
      console.error('Error uploading speaker photo:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload speaker photo'
      };
    }
  }

  // Delete file from storage
  static async deleteFile(filePath: string): Promise<UploadResult> {
    try {
      const { error } = await supabase.storage
        .from('ganapp-storage')
        .remove([filePath]);

      if (error) throw error;

      return {
        success: true
      };
    } catch (error) {
      console.error('Error deleting file:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete file'
      };
    }
  }

  // Get file URL from path
  static getFileUrl(filePath: string): string {
    const { data } = supabase.storage
      .from('ganapp-storage')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  }

  // Validate file type and size
  static validateFile(file: File, allowedTypes: string[], maxSizeMB: number): { valid: boolean; error?: string } {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
      };
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `File too large. Maximum size: ${maxSizeMB}MB`
      };
    }

    return { valid: true };
  }

  // Get allowed file types for different uploads
  static getAllowedTypes(uploadType: 'banner' | 'materials' | 'logo' | 'photo'): string[] {
    switch (uploadType) {
      case 'banner':
        return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      case 'materials':
        return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      case 'logo':
        return ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
      case 'photo':
        return ['image/jpeg', 'image/jpg', 'image/png'];
      default:
        return [];
    }
  }
}
