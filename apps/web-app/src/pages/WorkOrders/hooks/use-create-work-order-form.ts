import {
  createWorkOrderSchema,
  mockAssets,
  type CreateWorkOrderFormData,
} from '@features/work-orders'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm, useWatch } from 'react-hook-form'

export function useCreateWorkOrderForm() {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateWorkOrderFormData>({
    resolver: zodResolver(createWorkOrderSchema),
    defaultValues: {
      assetId: '',
      location: '',
      description: '',
      type: 'PREVENTIVE',
      priority: 'medium',
      status: 'open',
      expectedStartDate: undefined,
      expectedEndDate: undefined,
      tasks: [],
      materials: [],
    },
  })

  // Watch assetId to auto-populate location
  const assetId = useWatch({ control: form.control, name: 'assetId' })

  // Auto-populate location when asset changes
  useEffect(() => {
    const selectedAsset = mockAssets.find((a) => a.value === assetId)
    if (selectedAsset && form.getValues('location') !== selectedAsset.location) {
      form.setValue('location', selectedAsset.location)
    }
  }, [assetId, form])

  const onSubmit: SubmitHandler<CreateWorkOrderFormData> = (data) => {
    console.info('create-work-order.submit', data)
    // TODO: Call API to create work order
    setOpen(false)
    form.reset()
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      form.reset()
    }
  }

  return {
    open,
    setOpen,
    handleOpenChange,
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}
