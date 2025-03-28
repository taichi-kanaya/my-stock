import type { Meta, StoryObj } from '@storybook/react'

import NotificationMessage from '@/components/basic/NotificationMessage'

const meta = {
  title: 'Basic/NotificationMessage',
  component: NotificationMessage,
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    type: 'info',
    children: 'Test notification info message',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    children: 'Test notification error message',
  },
}
