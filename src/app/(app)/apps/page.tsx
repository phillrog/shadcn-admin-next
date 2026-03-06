import { Suspense } from 'react'
import { Apps } from '@/features/apps'

export default async function AppsPage() {
  return (
    <Suspense fallback={<div>Loading apps...</div>}>
      <Apps />
    </Suspense>
  )
}
