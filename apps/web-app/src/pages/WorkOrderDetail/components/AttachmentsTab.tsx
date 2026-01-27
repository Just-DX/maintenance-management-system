import { useState } from 'react'

import { FileUpload, type UploadedFile } from '@justdx/components/atoms/FileUpload'
import { Attachments, type Attachment } from '@justdx/components/molecules/Attachments'

import type { WorkOrderAttachment } from '@features/work-orders'
import { workOrderDetailCopy } from '../constants/copy'

interface AttachmentsTabProps {
  attachments: WorkOrderAttachment[]
  isEditing?: boolean
  onRemove?: (id: string) => void
  onDownload?: (attachment: Attachment) => void
  onPreview?: (attachment: Attachment) => void
}

export function AttachmentsTab({
  attachments,
  isEditing = false,
  onRemove,
  onDownload,
  onPreview,
}: AttachmentsTabProps) {
  const copy = workOrderDetailCopy.attachments
  const [uploadingFiles, setUploadingFiles] = useState<UploadedFile[]>([])

  // Convert WorkOrderAttachment to Attachment type
  const mappedAttachments: Attachment[] = attachments.map((att) => ({
    id: att.id,
    fileName: att.fileName,
    fileUrl: att.fileUrl,
    fileType: att.fileType,
    fileSize: att.fileSize,
    uploadedAt: att.uploadedAt,
  }))

  const handleFilesSelect = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file, index) => ({
      id: `upload-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading' as const,
    }))

    setUploadingFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        if (progress <= 100) {
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? { ...f, progress, status: progress === 100 ? 'success' : 'uploading' }
                : f
            )
          )
        } else {
          clearInterval(interval)
        }
      }, 200)
    })
  }

  const handleUploadRemove = (fileId: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{copy.sectionTitle}</h3>
      </div>

      {/* File Upload - Only show in edit mode */}
      {isEditing && (
        <FileUpload
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
          multiple
          files={uploadingFiles}
          onFilesSelect={handleFilesSelect}
          onFileRemove={handleUploadRemove}
        />
      )}

      {/* Existing Attachments */}
      <Attachments
        attachments={mappedAttachments}
        variant="list"
        showActions={true}
        onRemove={isEditing ? onRemove : undefined}
        onDownload={onDownload}
        onPreview={onPreview}
      />
    </div>
  )
}
