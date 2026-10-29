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
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
        {
          'bg-navy text-white hover:bg-navy-light focus-visible:ring-navy shadow-soft': variant === 'primary',
          'bg-white text-navy border-2 border-navy hover:bg-blue-light focus-visible:ring-navy': variant === 'secondary' || variant === 'outline',
          'text-dark hover:bg-background focus-visible:ring-dark': variant === 'ghost',
        },
        {
          'h-10 px-5 text-sm': size === 'sm',
          'h-12 px-6 text-base': size === 'md',
          'h-14 px-8 text-lg': size === 'lg',
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
