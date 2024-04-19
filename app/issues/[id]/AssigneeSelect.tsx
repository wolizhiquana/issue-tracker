'use client'

import { Skeleton } from '@/app/components'
import { Issue } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { User } from 'next-auth'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUser()

  if (isLoading) return <Skeleton />

  if (error) return null

  const assignedIssue = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId !== 'unassigned' ? userId : null
      })
      .catch(() => {
        toast.error('Changes clould not be saved.')
      })
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={assignedIssue}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value='unassigned'>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id!}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  )
}

const useUser = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, //60s,
    retry: 3
  })

export default AssigneeSelect
