import type { Meta, StoryObj } from '@storybook/react'

import Link from '@/components/basic/Link'

const meta = {
  title: 'Basic/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '#',
    children: 'Test link',
  },
}
