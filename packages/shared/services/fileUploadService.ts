import { supabase } from '../supabaseClient'

export interface UploadResult {
  success: boolean
  url?: string
  filename?: string
  error?: string
}

export class FileUploadService {
  static getAllowedTypes(uploadType: string): string[] {
    switch (uploadType) {
      case 'banner':
        return ['image/jpeg', 'image/png', 'image/webp']
      case 'materials':
        return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      case 'logo':
        return ['image/jpeg', 'image/png', 'image/svg+xml']
      case 'photo':
        return ['image/jpeg', 'image/png']
      case 'event-kits':
        return ['*/*'] // Accept any file type for kits
      case 'event-programmes':
        return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      case 'certificate-template':
        return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']
      default:
        return ['*/*']
    }
  }

  static validateFile(file: File, allowedTypes: string[], maxSizeMB: number): { valid: boolean; error?: string } {
    if (file.size > maxSizeMB * 1024 * 1024) {
      return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit` }
    }

    if (allowedTypes.length > 0 && allowedTypes[0] !== '*/*') {
      if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: `File type ${file.type} is not allowed` }
      }
    }

    return { valid: true }
  }

  static async uploadEventBanner(file: File, filename: string): Promise<UploadResult> {
    try {
      const { data, error } = await supabase.storage
        .from('event-banners')
        .upload(filename, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('event-banners')
        .getPublicUrl(data.path)

      return {
        success: true,
        url: urlData.publicUrl,
        filename: data.path
      }
    } catch (error) {
      console.error('Error uploading event banner:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      }
    }
  }

  static async uploadEventMaterials(file: File, filename: string, folder: string): Promise<UploadResult> {
    try {
      const { data, error } = await supabase.storage
        .from('event-kits')
        .upload(`${folder}/${filename}`, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('event-kits')
        .getPublicUrl(data.path)

      return {
        success: true,
        url: urlData.publicUrl,
        filename: data.path
      }
    } catch (error) {
      console.error('Error uploading event materials:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      }
    }
  }

  static async uploadSponsorLogo(file: File, filename: string, sponsorId: string): Promise<UploadResult> {
    try {
      const { data, error } = await supabase.storage
        .from('sponsor-logos')
        .upload(`${sponsorId}/${filename}`, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('sponsor-logos')
        .getPublicUrl(data.path)

      return {
        success: true,
        url: urlData.publicUrl,
        filename: data.path
      }
    } catch (error) {
      console.error('Error uploading sponsor logo:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      }
    }
  }

  static async uploadSpeakerPhoto(file: File, filename: string, speakerId: string): Promise<UploadResult> {
    try {
      const { data, error } = await supabase.storage
        .from('speaker-photos')
        .upload(`${speakerId}/${filename}`, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('speaker-photos')
        .getPublicUrl(data.path)

      return {
        success: true,
        url: urlData.publicUrl,
        filename: data.path
      }
    } catch (error) {
      console.error('Error uploading speaker photo:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      }
    }
  }

  static async uploadEventKits(file: File, filename: string): Promise<UploadResult> {
    try {
      const { data, error } = await supabase.storage
        .from('event-kits')
        .upload(`kits/${filename}`, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('event-kits')
        .getPublicUrl(data.path)

      return {
        success: true,
        url: urlData.publicUrl,
        filename: data.path
      }
    } catch (error) {
      console.error('Error uploading event kits:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      }
    }
  }

  static async uploadEventProgramme(file: File, filename: string): Promise<UploadResult> {
    try {
      const { data, error } = await supabase.storage
        .from('event-programmes')
        .upload(`programmes/${filename}`, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('event-programmes')
        .getPublicUrl(data.path)

      return {
        success: true,
        url: urlData.publicUrl,
        filename: data.path
      }
    } catch (error) {
      console.error('Error uploading event programme:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      }
    }
  }

  static async uploadCertificateTemplate(file: File, filename: string): Promise<UploadResult> {
    try {
      const { data, error } = await supabase.storage
        .from('certificate-template')
        .upload(`templates/${filename}`, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('certificate-template')
        .getPublicUrl(data.path)

      return {
        success: true,
        url: urlData.publicUrl,
        filename: data.path
      }
    } catch (error) {
      console.error('Error uploading certificate template:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      }
    }
  }

  static async deleteFile(bucketName: string, filePath: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath])

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error('Error deleting file:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed'
      }
    }
  }
}
