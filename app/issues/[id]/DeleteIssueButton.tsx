'use client'

import { Spinner } from '@/app/components'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [isDeleting, setDeleting] = useState(false)

  const deleteIssue = async () => {
    try {
      setDeleting(true)
      await axios.delete(`/api/issues/${issueId}`)
      router.push('/issues/list')
      router.refresh()
    } catch (error) {
      setDeleting(false)
      setError(true)
    }
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color='red' disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </Dialog.Description>
          <Flex justify='end' gap='3' mt='4'>
            <Dialog.Close>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color='red' onClick={deleteIssue}>
                Delete
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root open={error}>
        <Dialog.Content>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Description>
            This issue could not be deleted
          </Dialog.Description>
          <Dialog.Close>
            <Button
              color='gray'
              variant='soft'
              mt='2'
              onClick={() => setError(false)}
            >
              OK
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

export default DeleteIssueButton
