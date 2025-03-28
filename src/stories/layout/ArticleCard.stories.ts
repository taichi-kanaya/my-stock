import type { Meta, StoryObj } from '@storybook/react'

import ArticleCard from '@/components/layout/ArticleCard'

const meta = {
  title: 'Layout/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    articleId: '1000',
    articleTitle: 'Test article card',
  },
}
