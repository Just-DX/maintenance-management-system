import type { ComponentProps, ReactNode } from 'react'

import type { Input } from '../Input'

export interface InputGroupProps extends ComponentProps<typeof Input> {
  startIcon?: ReactNode
  endIcon?: ReactNode
}
