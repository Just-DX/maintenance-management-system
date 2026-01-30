import type { Attachment } from './Attachments.type'

export const attachmentsFixtures: {
  emptyAttachments: Attachment[]
  sampleAttachments: Attachment[]
  imageAttachments: Attachment[]
} = {
  emptyAttachments: [],
  sampleAttachments: [
    {
      id: 'att-1',
      fileName: 'maintenance-report.pdf',
      fileUrl: '/attachments/maintenance-report.pdf',
      fileType: 'application/pdf',
      fileSize: 245000,
      uploadedAt: '2026-01-27T09:00:00Z',
    },
    {
      id: 'att-2',
      fileName: 'equipment-photo.jpg',
      fileUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
      fileType: 'image/jpeg',
      fileSize: 512000,
      uploadedAt: '2026-01-26T14:30:00Z',
    },
    {
      id: 'att-3',
      fileName: 'work-instructions.docx',
      fileUrl: '/attachments/work-instructions.docx',
      fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      fileSize: 125000,
      uploadedAt: '2026-01-25T10:15:00Z',
    },
    {
      id: 'att-4',
      fileName: 'parts-list.xlsx',
      fileUrl: '/attachments/parts-list.xlsx',
      fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      fileSize: 89000,
      uploadedAt: '2026-01-24T16:45:00Z',
    },
  ],
  imageAttachments: [
    {
      id: 'img-1',
      fileName: 'before-inspection.jpg',
      fileUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
      fileType: 'image/jpeg',
      fileSize: 320000,
      uploadedAt: '2026-01-27T08:00:00Z',
    },
    {
      id: 'img-2',
      fileName: 'after-repair.jpg',
      fileUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
      fileType: 'image/jpeg',
      fileSize: 280000,
      uploadedAt: '2026-01-27T12:30:00Z',
    },
    {
      id: 'img-3',
      fileName: 'damage-detail.png',
      fileUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      fileType: 'image/png',
      fileSize: 450000,
      uploadedAt: '2026-01-27T09:15:00Z',
    },
  ],
}
