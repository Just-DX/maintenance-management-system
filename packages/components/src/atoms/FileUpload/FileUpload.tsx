'use client'

import { AlertCircle, CheckCircle2, FileIcon, Loader2, Upload, X } from 'lucide-react'
import * as React from 'react'

import { formatFileSize } from '@justdx/common'
import { cn } from '../../lib/utils'
import { Button } from '../Button'
import {
  fileUploadStateStyles,
  fileUploadStyles,
  type FileUploadState,
} from './FileUpload.constants'
import type { FileUploadProps, UploadedFile } from './FileUpload.type'


// ============================================================================
// Types
// ============================================================================


function getFileIcon(_fileType: string) {
  // Could extend with more specific icons based on file type
  return FileIcon
}

// ============================================================================
// FileUpload Component
// ============================================================================

export function FileUpload({
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  multiple = true,
  files = [],
  onFilesSelect,
  onFileRemove,
  disabled = false,
  className,
}: FileUploadProps) {
  const [isDragActive, setIsDragActive] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragEnter = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        setIsDragActive(true)
      }
    },
    [disabled]
  )

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }, [])

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)

      if (disabled) return

      const droppedFiles = Array.from(e.dataTransfer.files)
      const validFiles = droppedFiles.filter((file) => file.size <= maxSize)

      const firstFile = validFiles[0]
      if (firstFile) {
        onFilesSelect?.(multiple ? validFiles : [firstFile])
      }
    },
    [disabled, maxSize, multiple, onFilesSelect]
  )

  const handleFileSelect = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || [])
      const validFiles = selectedFiles.filter((file) => file.size <= maxSize)

      if (validFiles.length > 0) {
        onFilesSelect?.(validFiles)
      }

      // Reset input
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    [maxSize, onFilesSelect]
  )

  const handleClick = React.useCallback(() => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }, [disabled])

  const getStateIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop Zone */}
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          fileUploadStyles.dropZone,
          isDragActive && fileUploadStyles.dropZoneActive,
          disabled && fileUploadStyles.dropZoneDisabled
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        <div className={fileUploadStyles.content}>
          <div className={fileUploadStyles.iconWrapper}>
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className={fileUploadStyles.textWrapper}>
            <p className={fileUploadStyles.title}>
              <span className={fileUploadStyles.link}>Click to upload</span> or drag and drop
            </p>
            <p className={fileUploadStyles.description}>
              {accept ? `Accepted: ${accept}` : 'Any file type'} (max {formatFileSize(maxSize)})
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className={fileUploadStyles.fileList}>
          {files.map((file) => {
            const FileIconComponent = getFileIcon(file.type)
            const stateStyle = fileUploadStateStyles[file.status as FileUploadState]

            return (
              <div key={file.id} className={cn(fileUploadStyles.fileItem, stateStyle)}>
                <div className={fileUploadStyles.fileInfo}>
                  <FileIconComponent className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className={fileUploadStyles.fileName}>{file.name}</p>
                    <p className={fileUploadStyles.fileSize}>
                      {formatFileSize(file.size)}
                      {file.error && <span className="text-destructive ml-2">{file.error}</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Progress or Status Icon */}
                  {file.status === 'uploading' && file.progress !== undefined ? (
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{file.progress}%</span>
                    </div>
                  ) : (
                    getStateIcon(file.status)
                  )}

                  {/* Remove Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      onFileRemove?.(file.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

FileUpload.displayName = 'FileUpload'
