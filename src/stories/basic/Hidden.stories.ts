import type { Meta, StoryObj } from '@storybook/react'

import Hidden from '@/components/basic/Hidden'

const meta = {
  title: 'Basic/Hidden',
  component: Hidden,
  tags: ['autodocs'],
} satisfies Meta<typeof Hidden>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'default',
    value: 'default',
  },
}
