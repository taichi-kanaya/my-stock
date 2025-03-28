import type { Meta, StoryObj } from '@storybook/react'

import Button from '@/components/basic/Button'

const meta = {
  title: 'Basic/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['button', 'submit'],
      defaultValue: 'button',
    },
    isPrimary: {
      control: 'boolean',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const ButtonPrimary: Story = {
  args: {
    type: 'button',
    isPrimary: true,
    children: 'Button Primary',
  },
}

export const ButtonSecondary: Story = {
  args: {
    type: 'button',
    isPrimary: false,
    children: 'Button Secondary',
  },
}

export const SubmitPrimary: Story = {
  args: {
    type: 'submit',
    isPrimary: true,
    children: 'Submit Primary',
  },
}

export const SubmitSecondary: Story = {
  args: {
    type: 'submit',
    isPrimary: false,
    children: 'Submit Secondary',
  },
}
