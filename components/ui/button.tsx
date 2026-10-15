import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  textSize?: 'xs' | 'sm' | 'base' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', textSize, ...props }, ref) => {
  // Determine text size
  const actualTextSize = textSize || (size === 'sm' ? 'sm' : size === 'md' ? 'base' : 'lg')
  
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-[#0D9488] text-white hover:bg-[#0b7d72] focus-visible:ring-[#0D9488]': variant === 'primary',
          'bg-[#103B66] text-white hover:bg-[#0c2e52] focus-visible:ring-[#103B66]': variant === 'secondary',
          'border-2 border-[#103B66] text-[#103B66] hover:bg-[#103B66] hover:text-white focus-visible:ring-[#103B66]':
            variant === 'outline',
          'text-[#172B3A] hover:bg-[#F4F7FA] focus-visible:ring-[#172B3A]': variant === 'ghost',
        },
        {
          'h-9 px-4': size === 'sm',
          'h-11 px-6': size === 'md',
          'h-14 px-8': size === 'lg',
        },
        {
          'text-xs': actualTextSize === 'xs',
          'text-sm': actualTextSize === 'sm',
          'text-base': actualTextSize === 'base',
          'text-lg': actualTextSize === 'lg',
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export { Button }
