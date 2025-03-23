'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { isValid } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ARTICLE_MAX_LENGTHS, MESSAGES } from '@/constants/validation'
import { ArticleFormData } from '@/features/articles/types'

// バリデーションルールの定義
export const schema = z.object({
  entryId: z.string().optional(),
  id: z
    .string()
    .nonempty(MESSAGES.REQUIRED)
    .max(ARTICLE_MAX_LENGTHS.ID, {
      message: MESSAGES.MAX_LENGTH_NUM(ARTICLE_MAX_LENGTHS.ID),
    }),
  title: z
    .string()
    .nonempty(MESSAGES.REQUIRED)
    .max(ARTICLE_MAX_LENGTHS.TITLE, {
      message: MESSAGES.MAX_LENGTH_TEXT(ARTICLE_MAX_LENGTHS.TITLE),
    }),
  body: z
    .string()
    .nonempty(MESSAGES.REQUIRED)
    .max(ARTICLE_MAX_LENGTHS.BODY, { message: MESSAGES.MAX_LENGTH_TEXT(ARTICLE_MAX_LENGTHS.BODY) }),
  publicAt: z
    .any() // 一旦 any にして refine で検証
    .refine((value) => isValid(value), {
      message: MESSAGES.INVALID_DATE,
    }),
  views: z
    .string()
    .nonempty(MESSAGES.REQUIRED)
    .max(ARTICLE_MAX_LENGTHS.VIEWS, {
      message: MESSAGES.MAX_LENGTH_NUM(ARTICLE_MAX_LENGTHS.VIEWS),
    }),
})

function useArticleForm(defaultValues?: Partial<ArticleFormData>) {
  return useForm<ArticleFormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  })
}

export default useArticleForm
