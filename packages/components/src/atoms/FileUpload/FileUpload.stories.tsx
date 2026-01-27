import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { FileUpload, type UploadedFile } from './FileUpload'
import { fileUploadFixtures } from './FileUpload.fixtures'

const meta: Meta<typeof FileUpload> = {
  title: 'Atoms/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof FileUpload>

// Interactive story with state management
function FileUploadDemo() {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleFilesSelect = (selectedFiles: File[]) => {
    const newFiles: UploadedFile[] = selectedFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading' as const,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        if (progress <= 100) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? { ...f, progress, status: progress === 100 ? 'success' : 'uploading' }
                : f
            )
          )
        } else {
          clearInterval(interval)
        }
      }, 300)
    })
  }

  const handleFileRemove = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  return (
    <div className="w-[400px]">
      <FileUpload
        files={files}
        onFilesSelect={handleFilesSelect}
        onFileRemove={handleFileRemove}
        accept="image/*,.pdf,.doc,.docx"
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <FileUploadDemo />,
}

export const Empty: Story = {
  args: {
    files: fileUploadFixtures.emptyFiles,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
}

export const Uploading: Story = {
  args: {
    files: fileUploadFixtures.uploadingFiles,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
}

export const MixedStatus: Story = {
  args: {
    files: fileUploadFixtures.mixedStatusFiles,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
}

export const Disabled: Story = {
  args: {
    disabled: true,
    files: [],
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
}

export const ImagesOnly: Story = {
  args: {
    accept: 'image/*',
    files: [],
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
}
