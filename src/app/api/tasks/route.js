import { NextResponse } from 'next/server'
import { prisma } from '@/services/prisma'

export async function GET() {
  try {
    const tasks = await prisma.task.findMany()
    return NextResponse.json({ success: true, tasks })
  } catch (error) {
    console.error('Error in GET /api/tasks:', error)
    return NextResponse.json({ success: false, error: error.message })
  }
}

export async function POST(request) {
  try {
    const { title, description } = await request.json()
    const newTask = await prisma.task.create({
      data: { title, description },
    })
    return NextResponse.json({ success: true, task: newTask })
  } catch (error) {
    console.error('Error in POST /api/tasks:', error)
    return NextResponse.json({ success: false, error: error.message })
  }
}
