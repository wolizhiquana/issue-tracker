'use client'

import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMdeReact from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const [error, setError] = useState('')

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('An unexpected error occurred.')
          }
        })}
      >
        <TextField.Root placeholder='Title' {...register('title')} />
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder='Description' {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
