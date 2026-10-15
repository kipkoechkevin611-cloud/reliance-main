import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children: ReactNode
  className?: string
}

/**
 * Shared content width/padding so page bodies align with header and footer.
 * Outer sections stay full-bleed; put backgrounds on the parent, not here.
 */
export function Container({
  as: Component = 'div',
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </Component>
  )
}
