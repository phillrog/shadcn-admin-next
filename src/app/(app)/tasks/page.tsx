import { Suspense } from 'react'
import { Tasks } from '@/features/tasks'

export default function TasksPage() {
  return (
    <Suspense fallback={<div>Loading tasks...</div>}>
      <Tasks />
    </Suspense>
  )
}
