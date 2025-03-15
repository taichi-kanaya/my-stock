import type { Meta, StoryObj } from '@storybook/react'

import LocalHeader from '@/app/components/layout/LocalHeader'

const meta = {
  title: 'Layout/LocalHeader',
  component: LocalHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof LocalHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Test local header',
  },
}
