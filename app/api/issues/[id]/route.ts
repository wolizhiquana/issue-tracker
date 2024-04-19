import { IssueSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import delay from 'delay'
import { auth } from '@/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()
  const validation = IssueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })
  if (!issue) return NextResponse.json({ error: 'Invalid issue' })

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description }
  })

  return NextResponse.json(updatedIssue)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) return NextResponse.json({}, { status: 401 })

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue id' }, { status: 404 })

  await prisma.issue.delete({
    where: { id: parseInt(params.id) }
  })

  return NextResponse.json(issue)
}
