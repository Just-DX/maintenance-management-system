import type { AutoFieldsProps } from '@justdx/components/molecules/AutoField'

import {
  mockAssets,
  workOrderPriorityOptions,
  workOrderStatusOptions,
  workOrderTypeOptions,
} from './constants'
import type { CreateWorkOrderFormData } from './schemas'

// ============================================================================
// Work Order Copy (field labels and placeholders)
// ============================================================================

export const workOrderFieldsCopy = {
  assetId: {
    label: 'Asset',
    placeholder: 'Select an asset...',
  },
  location: {
    label: 'Location',
    placeholder: 'Auto-populated from asset',
  },
  description: {
    label: 'Description',
    placeholder: 'Detailed description of the work order...',
  },
  type: {
    label: 'Type',
    placeholder: 'Select work order type...',
  },
  priority: {
    label: 'Priority',
    placeholder: 'Select priority...',
  },
  status: {
    label: 'Status',
    placeholder: 'Select status...',
  },
  expectedStartDate: {
    label: 'Expected Start Date',
  },
  expectedEndDate: {
    label: 'Expected End Date',
  },
}

// ============================================================================
// Information Tab Fields
// ============================================================================

export const informationFields: AutoFieldsProps<CreateWorkOrderFormData>['fields'] = [
  {
    name: 'assetId',
    type: 'select',
    label: workOrderFieldsCopy.assetId.label,
    options: mockAssets.map((a) => ({ value: a.value, label: a.label })),
    props: {
      placeholder: workOrderFieldsCopy.assetId.placeholder,
    },
    rules: { required: true },
  },
  {
    name: 'location',
    type: 'input',
    label: workOrderFieldsCopy.location.label,
    disabled: true,
    props: {
      placeholder: workOrderFieldsCopy.location.placeholder,
    },
  },
  {
    name: 'description',
    type: 'textarea',
    label: workOrderFieldsCopy.description.label,
    props: {
      placeholder: workOrderFieldsCopy.description.placeholder,
      rows: 3,
    },
    rules: { required: true },
  },
  {
    name: 'type',
    type: 'select',
    label: workOrderFieldsCopy.type.label,
    options: workOrderTypeOptions.map((o) => ({ value: o.value, label: o.label })),
    props: {
      placeholder: workOrderFieldsCopy.type.placeholder,
    },
    rules: { required: true },
  },
  {
    name: 'priority',
    type: 'select',
    label: workOrderFieldsCopy.priority.label,
    options: workOrderPriorityOptions.map((o) => ({ value: o.value, label: o.label })),
    props: {
      placeholder: workOrderFieldsCopy.priority.placeholder,
    },
    rules: { required: true },
  },
  {
    name: 'status',
    type: 'select',
    label: workOrderFieldsCopy.status.label,
    options: workOrderStatusOptions.map((o) => ({ value: o.value, label: o.label })),
    props: {
      placeholder: workOrderFieldsCopy.status.placeholder,
    },
  },
  {
    name: 'expectedStartDate',
    type: 'date-picker',
    label: workOrderFieldsCopy.expectedStartDate.label,
  },
  {
    name: 'expectedEndDate',
    type: 'date-picker',
    label: workOrderFieldsCopy.expectedEndDate.label,
  },
]
