import type { Meta, StoryObj } from '@storybook/react'

import TextArea from '@/components/basic/TextArea'

const meta = {
  title: 'Basic/TextArea',
  component: TextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'default',
    rows: 10,
    maxLength: 1000,
  },
}
