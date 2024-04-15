'use client'

import { Button, TextField } from '@radix-ui/themes'
import SimpleMdeReact from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

const page = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder='Title' />
      <SimpleMdeReact placeholder='Description' />
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default page
