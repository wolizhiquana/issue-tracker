'use client'

import { Button, Dialog, Flex } from '@radix-ui/themes'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color='red'>Delete Issue</Button>
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
            <Button color='red'>sure</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default DeleteIssueButton
