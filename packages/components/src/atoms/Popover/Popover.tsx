import {
  Popover as PopoverRoot,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '../../shadcn-primitives/popover'

export const Popover = Object.assign(PopoverRoot, {
  Anchor: PopoverAnchor,
  Content: PopoverContent,
  Trigger: PopoverTrigger,
})
