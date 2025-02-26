import { NextResponse } from 'next/server'
import { prismaClient } from '../../../../../../prisma/prismaClient'

export async function GET() {
  try {
    const comments = await prismaClient.comment.findMany({
      include: {
        post: true,
      },
    })
    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 })
  }
}
