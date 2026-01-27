import type { AutoFieldsProps } from '@justdx/components/molecules/AutoField'

import { createWorkOrderCopy } from '../constants/copy'
import type { CreateWorkOrderFormData } from './schema'

// ============================================================================
// Mock Data (replace with real data from API)
// ============================================================================

export const mockAssets = [
  { value: 'asset-1', label: 'HVAC Unit #1', location: 'Building A, Floor 1' },
  { value: 'asset-2', label: 'Elevator #2', location: 'Building A, Main Lobby' },
  { value: 'asset-3', label: 'Generator #3', location: 'Building B, Basement' },
  { value: 'asset-4', label: 'Cooling Tower #4', location: 'Building C, Rooftop' },
]

export const mockAssignees = [
  { value: 'user-1', label: 'John Smith' },
  { value: 'user-2', label: 'Sarah Johnson' },
  { value: 'user-3', label: 'Mike Chen' },
  { value: 'user-4', label: 'Emily Davis' },
]

// ============================================================================
// Information Tab Fields
// ============================================================================

export const informationFields: AutoFieldsProps<CreateWorkOrderFormData>['fields'] = [
  {
    name: 'assetId',
    type: 'select',
    label: createWorkOrderCopy.fields.assetId.label,
    options: mockAssets.map((a) => ({ value: a.value, label: a.label })),
    props: {
      placeholder: createWorkOrderCopy.fields.assetId.placeholder,
    },
    rules: { required: true },
  },
  {
    name: 'location',
    type: 'input',
    label: createWorkOrderCopy.fields.location.label,
    disabled: true,
    props: {
      placeholder: createWorkOrderCopy.fields.location.placeholder,
    },
  },
  {
    name: 'description',
    type: 'textarea',
    label: createWorkOrderCopy.fields.description.label,
    props: {
      placeholder: createWorkOrderCopy.fields.description.placeholder,
      rows: 3,
    },
    rules: { required: true },
  },
  {
    name: 'type',
    type: 'select',
    label: createWorkOrderCopy.fields.type.label,
    options: [
      { value: 'PREVENTIVE', label: 'Preventive' },
      { value: 'CORRECTIVE', label: 'Corrective' },
    ],
    props: {
      placeholder: createWorkOrderCopy.fields.type.placeholder,
    },
    rules: { required: true },
  },
  {
    name: 'priority',
    type: 'select',
    label: createWorkOrderCopy.fields.priority.label,
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'critical', label: 'Critical' },
    ],
    props: {
      placeholder: createWorkOrderCopy.fields.priority.placeholder,
    },
    rules: { required: true },
  },
  {
    name: 'status',
    type: 'select',
    label: createWorkOrderCopy.fields.status.label,
    options: [
      { value: 'open', label: 'Open' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'on-hold', label: 'On Hold' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
    props: {
      placeholder: createWorkOrderCopy.fields.status.placeholder,
    },
  },
  {
    name: 'expectedStartDate',
    type: 'date-picker',
    label: createWorkOrderCopy.fields.expectedStartDate.label,
  },
  {
    name: 'expectedEndDate',
    type: 'date-picker',
    label: createWorkOrderCopy.fields.expectedEndDate.label,
  },
]

// ============================================================================
// Task Fields (for adding individual tasks)
// ============================================================================

export const taskStatusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
]

export const taskTypeOptions = [
  { value: 'passed', label: 'Passed' },
  { value: 'failed', label: 'Failed' },
]

// ============================================================================
// Material Fields (for adding individual materials)
// ============================================================================

// Note: Material fields will be rendered inline in a table-like format
// These are kept simple for reference
