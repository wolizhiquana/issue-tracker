import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '../../components'
import IssueActions from './IssueActions'
import delay from 'delay'

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()

  await delay(500)

  return (
    <div>
      <IssueActions />

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              CrreateAt
            </Table.ColumnHeaderCell>
          </Table.Row>

          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Header>
      </Table.Root>
    </div>
  )
}

// export const dynamic = 'force-dynamic'
export const revalidate = 0

export default IssuesPage
