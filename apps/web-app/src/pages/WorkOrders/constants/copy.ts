export const workOrdersCopy = {
  title: 'Work Orders',
  description: 'Manage and track maintenance tasks across all facilities.',
}

export const createWorkOrderCopy = {
  modal: {
    title: 'Create Work Order',
    description: 'Create a new work order for this site',
    cancel: 'Cancel',
    submit: 'Create Work Order',
  },
  tabs: {
    information: 'Information',
    tasks: 'Tasks',
    materials: 'Materials',
  },
  sections: {
    basicInfo: 'Basic Information',
    schedule: 'Schedule',
    tasks: 'Tasks',
    materials: 'Materials',
  },
  fields: {
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
  },
  tasks: {
    add: 'Add Task',
    empty: 'No tasks added yet',
    description: 'Description',
    status: 'Status',
    assignees: 'Assignees',
    planTime: 'Planned Time (hrs)',
    type: 'Result Type',
    required: 'Required',
  },
  materials: {
    add: 'Add Material',
    empty: 'No materials added yet',
    name: 'Material Name',
    planQuantity: 'Plan Qty',
    unitCost: 'Unit Cost',
    totalPlanCost: 'Total Plan Cost',
  },
}
