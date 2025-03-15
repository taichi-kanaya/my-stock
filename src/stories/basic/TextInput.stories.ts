import type { Meta, StoryObj } from '@storybook/react'

import TextInput from '@/app/components/basic/TextInput'

const meta = {
  title: 'Basic/TextInput',
  component: TextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'default',
    maxLength: 11,
  },
}
