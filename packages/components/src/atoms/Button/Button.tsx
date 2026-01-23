import { Button as ButtonShadcn, type ButtonProps } from '../../shadcn-primitives/button/button'

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonShadcn {...props}>{children}</ButtonShadcn>
}

Button.displayName = 'Button'
