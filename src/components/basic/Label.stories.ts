import type { Meta, StoryObj } from '@storybook/react'

import Label from '@/components/basic/Label'

const meta = {
  title: 'Basic/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Require: Story = {
  args: {
    isRequire: true,
    children: 'require',
  },
}

export const Optional: Story = {
  args: {
    isRequire: false,
    children: 'optional',
  },
}
