import { fn } from '@storybook/test'
import DatePicker from '@/app/components/basic/DatePicker'

import type { Meta, StoryObj } from '@storybook/react'

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
