import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import DatePicker from '@/components/basic/DatePicker'

const meta = {
  title: 'Basic/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onChange: fn(),
  },
}
