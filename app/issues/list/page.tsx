import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '../../components'
import NextLink from 'next/link'
import IssueActions from './IssueActions'
import delay from 'delay'
import { Issue, Status } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; desc: boolean }
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { lable: string; value: keyof Issue; className?: string }[] = [
    { lable: 'Issue', value: 'title' },
    { lable: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { lable: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
  ]

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const issues = await prisma.issue.findMany({
    where: { status }
  })

  return (
    <div>
      <IssueActions />

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      desc:
                        column.value === searchParams.orderBy &&
                        !searchParams.desc
                          ? true
                          : undefined
                    }
                  }}
                >
                  {column.lable}
                </NextLink>
                {column.value === searchParams.orderBy &&
                  (searchParams.desc ? (
                    <ArrowDownIcon className='inline' />
                  ) : (
                    <ArrowUpIcon className='inline' />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
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
