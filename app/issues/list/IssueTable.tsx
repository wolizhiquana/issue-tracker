import { IssueStatusBadge, Link } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import { default as NextLink } from 'next/link'

export interface IssueQuery {
  status: Status
  orderBy: keyof Issue
  order: 'asc' | 'desc'
  page: string
}

interface Props {
  searchParams: IssueQuery
  issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    order:
                      column.value === searchParams.orderBy &&
                      searchParams.order === 'asc'
                        ? 'desc'
                        : 'asc'
                  }
                }}
              >
                {column.lable}
              </NextLink>
              {column.value === searchParams.orderBy &&
                (searchParams.order === 'asc' ? (
                  <ArrowUpIcon className='inline' />
                ) : (
                  <ArrowDownIcon className='inline' />
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
  )
}

const columns: { lable: string; value: keyof Issue; className?: string }[] = [
  { lable: 'Issue', value: 'title' },
  { lable: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { lable: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
]

export const columnNames = columns.map((column) => column.value)

export default IssueTable
