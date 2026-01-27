'use client'

import { Button } from '@justdx/components/atoms/Button'
import { Dialog } from '@justdx/components/atoms/Dialog'
import { Form } from '@justdx/components/atoms/Form'
import { ScrollArea } from '@justdx/components/atoms/ScrollArea'
import { Tabs } from '@justdx/components/atoms/Tabs'
import { AutoFields } from '@justdx/components/molecules/AutoField'
import { ClipboardList, Info, Loader2, Wrench } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'

import { informationFields } from '../config/fields'
import type { CreateWorkOrderFormData } from '../config/schema'
import { createWorkOrderCopy } from '../constants/copy'
import { MaterialsSection } from './MaterialsSection'
import { TasksSection } from './TasksSection'

interface CreateWorkOrderModalProps {
  form: UseFormReturn<CreateWorkOrderFormData>
  onSubmit: (data: CreateWorkOrderFormData) => void
  isSubmitting: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateWorkOrderModal({
  form,
  onSubmit,
  isSubmitting,
  onOpenChange,
}: CreateWorkOrderModalProps) {

  return (
    <Dialog.Content className="sm:max-w-2xl p-0 gap-0">
      {/* Header */}
      <Dialog.Header className="px-6 pt-6 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <div>
            <Dialog.Title className="text-lg font-semibold">
              {createWorkOrderCopy.modal.title}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              {createWorkOrderCopy.modal.description}
            </Dialog.Description>
          </div>
        </div>
      </Dialog.Header>

      {/* Form Content */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <Tabs defaultValue="information" className="w-full">
            {/* Tab Navigation */}
            <div className="px-6 pt-4">
              <Tabs.List className="w-full grid grid-cols-3">
                <Tabs.Trigger value="information" className="gap-2">
                  <Info className="h-4 w-4" />
                  {createWorkOrderCopy.tabs.information}
                </Tabs.Trigger>
                <Tabs.Trigger value="tasks" className="gap-2">
                  <ClipboardList className="h-4 w-4" />
                  {createWorkOrderCopy.tabs.tasks}
                </Tabs.Trigger>
                <Tabs.Trigger value="materials" className="gap-2">
                  <ClipboardList className="h-4 w-4" />
                  {createWorkOrderCopy.tabs.materials}
                </Tabs.Trigger>
              </Tabs.List>
            </div>

            {/* Scrollable Content Area */}
            <ScrollArea className="max-h-[60vh]">
              {/* Information Tab */}
              <Tabs.Content value="information" className="px-6 py-4 mt-0">
                <div className="space-y-6">
                  {/* Basic Information Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      {createWorkOrderCopy.sections.basicInfo}
                    </h4>
                    <div className="grid gap-4 rounded-lg border p-4 bg-muted/30">
                      <AutoFields<CreateWorkOrderFormData>
                        form={form}
                        fields={informationFields.slice(0, 6)}
                      />
                    </div>
                  </div>

                  {/* Schedule Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      {createWorkOrderCopy.sections.schedule}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 rounded-lg border p-4 bg-muted/30">
                      <AutoFields<CreateWorkOrderFormData>
                        form={form}
                        fields={informationFields.slice(6)}
                      />
                    </div>
                  </div>
                </div>
              </Tabs.Content>

              {/* Tasks Tab */}
              <Tabs.Content value="tasks" className="px-6 py-4 mt-0">
                <div className="space-y-6">
                  <TasksSection form={form} />
                </div>
              </Tabs.Content>

              {/* Materials Tab */}
              <Tabs.Content value="materials" className="px-6 py-4 mt-0">
                <div className="space-y-6">
                  <MaterialsSection form={form} />
                </div>
              </Tabs.Content>
            </ScrollArea>
          </Tabs>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {createWorkOrderCopy.modal.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Wrench className="mr-2 h-4 w-4" />
                  {createWorkOrderCopy.modal.submit}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Dialog.Content>
  )
}
