import { cn } from '@/utils/cn'

/** Centred page gutter. `size` widens or narrows the reading measure. */
export function Container({ as: Tag = 'div', size = 'default', className, children }) {
  const sizes = {
    narrow: 'max-w-3xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1560px]',
  }

  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', sizes[size], className)}>
      {children}
    </Tag>
  )
}
