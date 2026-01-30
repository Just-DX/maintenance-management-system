import { Button as ButtonShadcn } from '../../shadcn-primitives/button/button'
import type { ButtonProps } from './Button.type'

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonShadcn {...props}>{children}</ButtonShadcn>
}

Button.displayName = 'Button'
