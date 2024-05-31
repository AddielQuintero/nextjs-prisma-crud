'use client'

import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

export default function Card({ task }) {
  const router = useRouter()

  const handleOnClick = () => {
    router.push(`/tasks/edit/${task.id}`)
  }

  return (
    <div
      onClick={handleOnClick}
      className="p-4 rounded border border-green-500 hover:bg-gray-100 hover:cursor-pointer"
    >
      <h3 className="font-semibold text-2xl">{task.title}</h3>
      <p>{task.description}</p>
      <p>{format(new Date(task.createdAt), 'dd-MM-yyyy')}</p>
    </div>
  )
}
