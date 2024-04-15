import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' }
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const { label, color } = statusMap[status]

  return <Badge color={color}>{label}</Badge>
}

export default IssueStatusBadge
