import Card from '@/components/Card'
import { API_URL } from '@/config/apiConfig'
// import { prisma } from '@/services/prisma'

// async function getData() {
//   const tasks = await prisma.task.findMany()
//   return tasks
// }

async function fetchTasks() {
  const res = await fetch(`${API_URL}/api/tasks`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`Failed to fetch tasks: ${res.status}`)
  }
  const data = await res.json()
  return data
}

export default async function Home() {
  // const tasks = await getData()
  const { tasks } = await fetchTasks()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-base font-semibold leading-7 text-gray-900">Task Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </main>
  )
}
