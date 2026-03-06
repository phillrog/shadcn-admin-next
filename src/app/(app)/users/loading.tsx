'use client'
import { Skeleton } from '@/components/ui/skeleton'

export default function UsersLoading() {
  return (
    <div className='p-8 space-y-4'>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-8 w-[200px]' />
        <Skeleton className='h-10 w-[100px]' />
      </div>
      <div className='border rounded-md p-4 space-y-2'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='h-12 w-full' />
        ))}
      </div>
    </div>
  )
}

