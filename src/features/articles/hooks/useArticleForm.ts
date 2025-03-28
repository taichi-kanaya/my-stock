'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ArticleFormData } from '@/features/articles/types'
import schema from '@/features/articles/validations/schema'

function useArticleForm(defaultValues?: Partial<ArticleFormData>) {
  return useForm<ArticleFormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  })
}

export default useArticleForm
