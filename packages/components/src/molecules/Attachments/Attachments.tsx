'use client'

import { Download, Eye, FileIcon, FileText, Film, Image, Music, Trash2 } from 'lucide-react'

import { formatFileSize } from '@justdx/common'
import { Button } from '../../atoms/Button'
import { cn } from '../../lib/utils'
import { attachmentsStyles } from './Attachments.constants'
import type { AttachmentsProps } from './Attachments.type'

// ============================================================================
// Types
// ============================================================================


function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function getFileIcon(fileType: string) {
  if (fileType.startsWith('image/')) return Image
  if (fileType.startsWith('video/')) return Film
  if (fileType.startsWith('audio/')) return Music
  if (fileType.includes('pdf') || fileType.includes('document') || fileType.includes('text'))
    return FileText
  return FileIcon
}

function isPreviewable(fileType: string): boolean {
  return fileType.startsWith('image/') || fileType === 'application/pdf'
}

// ============================================================================
// Attachments Component
// ============================================================================

export function Attachments({
  attachments,
  onRemove,
  onDownload,
  onPreview,
  variant = 'list',
  showActions = true,
  className,
}: AttachmentsProps) {
  if (attachments.length === 0) {
    return (
      <div className={cn(attachmentsStyles.empty, className)}>
        <FileIcon className="h-8 w-8 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">No attachments</p>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={cn(attachmentsStyles.grid, className)}>
        {attachments.map((attachment) => {
          const IconComponent = getFileIcon(attachment.fileType)
          const canPreview = isPreviewable(attachment.fileType)

          return (
            <div key={attachment.id} className={attachmentsStyles.gridItem}>
              {/* Thumbnail or Icon */}
              <div className={attachmentsStyles.gridThumbnail}>
                {attachment.fileType.startsWith('image/') ? (
                  <img
                    src={attachment.fileUrl}
                    alt={attachment.fileName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <IconComponent className="h-8 w-8 text-muted-foreground" />
                )}

                {/* Hover Overlay */}
                {showActions && (
                  <div className={attachmentsStyles.gridOverlay}>
                    {canPreview && onPreview && (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPreview(attachment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {onDownload && (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onDownload(attachment)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    {onRemove && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onRemove(attachment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className={attachmentsStyles.gridInfo}>
                <p className={attachmentsStyles.fileName}>{attachment.fileName}</p>
                <p className={attachmentsStyles.fileMeta}>{formatFileSize(attachment.fileSize)}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // List variant (default)
  return (
    <div className={cn(attachmentsStyles.list, className)}>
      {attachments.map((attachment) => {
        const IconComponent = getFileIcon(attachment.fileType)
        const canPreview = isPreviewable(attachment.fileType)

        return (
          <div key={attachment.id} className={attachmentsStyles.listItem}>
            {/* Icon */}
            <div className={attachmentsStyles.listIcon}>
              <IconComponent className="h-5 w-5 text-muted-foreground" />
            </div>

            {/* File Info */}
            <div className={attachmentsStyles.listInfo}>
              <p className={attachmentsStyles.fileName}>{attachment.fileName}</p>
              <p className={attachmentsStyles.fileMeta}>
                {formatFileSize(attachment.fileSize)} • {formatDate(attachment.uploadedAt)}
              </p>
            </div>

            {/* Actions */}
            {showActions && (
              <div className={attachmentsStyles.listActions}>
                {canPreview && onPreview && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onPreview(attachment)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
                {onDownload && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onDownload(attachment)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                )}
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRemove(attachment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

Attachments.displayName = 'Attachments'
