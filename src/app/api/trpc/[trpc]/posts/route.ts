import { NextResponse } from 'next/server'
import { prismaClient } from '../../../../../../prisma/prismaClient'

export async function GET() {
  try {
    const posts = await prismaClient.post.findMany({
      include: {
        author: true,
        comments: true,
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}
