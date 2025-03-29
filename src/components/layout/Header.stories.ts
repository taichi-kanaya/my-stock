import type { Meta, StoryObj } from '@storybook/react'

import Header from '@/components/layout/Header'

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const NotSignin: Story = {
  args: {
    isAuthenticated: false,
    onSignIn: () => alert('Signed in successfully'),
    onSignOut: () => alert('Signed out successfully'),
  },
}

export const SignedIn: Story = {
  args: {
    isAuthenticated: true,
    loginUserName: 'Taichi Kanaya',
    onSignIn: () => alert('Signed in successfully'),
    onSignOut: () => alert('Signed out successfully'),
  },
}
