import { IssueStatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'

interface Props {
  params: { id: string }
}

const IssueDetialPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue) notFound()

  return (
    <div>
      <Heading as='h2'>{issue.title}</Heading>
      <Flex gap='3' my='2' className='items-center'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose' mt='4'>
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  )
}

export default IssueDetialPage
