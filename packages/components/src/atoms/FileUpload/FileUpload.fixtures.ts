import type { UploadedFile } from './FileUpload'

export const fileUploadFixtures: {
  emptyFiles: UploadedFile[]
  uploadingFiles: UploadedFile[]
  mixedStatusFiles: UploadedFile[]
} = {
  emptyFiles: [],
  uploadingFiles: [
    {
      id: 'file-1',
      name: 'document.pdf',
      size: 1024000,
      type: 'application/pdf',
      progress: 45,
      status: 'uploading',
    },
    {
      id: 'file-2',
      name: 'spreadsheet.xlsx',
      size: 512000,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      progress: 80,
      status: 'uploading',
    },
  ],
  mixedStatusFiles: [
    {
      id: 'file-1',
      name: 'completed-file.pdf',
      size: 2048000,
      type: 'application/pdf',
      status: 'success',
    },
    {
      id: 'file-2',
      name: 'uploading-file.jpg',
      size: 512000,
      type: 'image/jpeg',
      progress: 60,
      status: 'uploading',
    },
    {
      id: 'file-3',
      name: 'failed-file.doc',
      size: 1024000,
      type: 'application/msword',
      status: 'error',
      error: 'Upload failed',
    },
  ],
}
