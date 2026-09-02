import { cn } from '@/utils/cn'

export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-lg bg-surface-sunken', className)} />
}

/** Placeholder matching the ProjectCard / InsightCard footprint. */
export function CardSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="aspect-[4/3] w-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </>
  )
}
