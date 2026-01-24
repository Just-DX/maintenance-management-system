import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { Button } from '../Button'
import { Input } from '../Input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './Form'

const meta = {
  title: 'Atoms/Form',
  tags: ['autodocs'],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

function FormDemo() {
  const form = useForm({
    defaultValues: {
      username: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          rules={{ required: 'Username is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const Default: Story = {
  render: () => <FormDemo />,
}
