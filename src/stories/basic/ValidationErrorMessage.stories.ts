import type { Meta, StoryObj } from '@storybook/react'

import ValidationErrorMessage from '@/app/components/basic/ValidationErrorMessage'

const meta = {
  title: 'Basic/ValidationErrorMessage',
  component: ValidationErrorMessage,
  tags: ['autodocs'],
} satisfies Meta<typeof ValidationErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {
  args: {
    children: 'Test validation error message',
  },
}

export const NoError: Story = {}
