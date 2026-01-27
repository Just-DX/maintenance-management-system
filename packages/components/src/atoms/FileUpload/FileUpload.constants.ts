// FileUpload Styles and Constants

export type FileUploadState = 'uploading' | 'success' | 'error'

export const fileUploadStyles = {
  dropZone:
    'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/50',
  dropZoneActive: 'border-primary bg-primary/5',
  dropZoneDisabled: 'cursor-not-allowed opacity-50',
  content: 'flex flex-col items-center gap-2',
  iconWrapper: 'flex h-12 w-12 items-center justify-center rounded-full bg-muted',
  textWrapper: 'space-y-1',
  title: 'text-sm font-medium text-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  description: 'text-xs text-muted-foreground',
  fileList: 'space-y-2',
  fileItem:
    'flex items-center justify-between gap-4 rounded-lg border bg-card p-3 transition-colors',
  fileInfo: 'flex items-center gap-3 min-w-0 flex-1',
  fileName: 'text-sm font-medium truncate',
  fileSize: 'text-xs text-muted-foreground',
} as const

export const fileUploadStateStyles: Record<FileUploadState, string> = {
  uploading: 'border-primary/50 bg-primary/5',
  success: 'border-green-500/50 bg-green-500/5',
  error: 'border-destructive/50 bg-destructive/5',
}
