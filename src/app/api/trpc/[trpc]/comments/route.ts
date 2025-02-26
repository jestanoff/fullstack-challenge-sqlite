import { NextRequest, NextResponse } from 'next/server'
import { prismaClient } from '../../../../../../prisma/prismaClient'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')

    if (postId) {
      const comments = await prismaClient.comment.findMany({
        where: {
          postId: parseInt(postId),
        },
        include: {
          post: true,
        },
        orderBy: {
          id: 'desc',
        },
      })
      return NextResponse.json(comments)
    }

    // If no postId provided, return all comments (existing functionality)
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
