import { prisma } from '@/services/prisma'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const task = await prisma.task.findUnique({
    where: {
      id: Number(params.id),
    },
  })
  return NextResponse.json(task)
}

export async function PUT(request, { params }) {
  const data = await request.json()
  const task = await prisma.task.update({
    where: {
      id: Number(params.id),
    },
    data,
  })
  return NextResponse.json(task)
}

export async function DELETE(request, { params }) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(params.id),
      },
    })
    return NextResponse.json({ success: true, task })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message })
  }
}
