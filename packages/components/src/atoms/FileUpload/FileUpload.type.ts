export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress?: number
  status: 'uploading' | 'success' | 'error'
  error?: string
}

export interface FileUploadProps {
  /** Accepted file types (e.g., 'image/*,.pdf') */
  accept?: string
  /** Maximum file size in bytes */
  maxSize?: number
  /** Allow multiple file uploads */
  multiple?: boolean
  /** Currently uploaded/uploading files */
  files?: UploadedFile[]
  /** Callback when files are selected */
  onFilesSelect?: (files: File[]) => void
  /** Callback when a file is removed */
  onFileRemove?: (fileId: string) => void
  /** Whether the upload zone is disabled */
  disabled?: boolean
  /** Custom class name */
  className?: string
}
