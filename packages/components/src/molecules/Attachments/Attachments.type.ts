export interface Attachment {
  id: string
  fileName: string
  fileUrl: string
  fileType: string
  fileSize: number
  uploadedAt: string
}

export interface AttachmentsProps {
  /** List of attachments to display */
  attachments: Attachment[]
  /** Callback when an attachment is removed */
  onRemove?: (attachmentId: string) => void
  /** Callback when an attachment is downloaded */
  onDownload?: (attachment: Attachment) => void
  /** Callback when an attachment is previewed */
  onPreview?: (attachment: Attachment) => void
  /** Display mode */
  variant?: 'list' | 'grid'
  /** Whether to show actions (remove, download) */
  showActions?: boolean
  /** Custom class name */
  className?: string
}
