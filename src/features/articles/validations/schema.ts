import { isValid } from 'date-fns'
import { z } from 'zod'

import { zIntInRange, zLimitedText } from '@/utils/schemaHelpers'

export const ID = {
  MIN: 1,
  MAX: 2_147_483_647,
}

export const VIEWS = {
  MIN: 1,
  MAX: 2_147_483_647,
}

export const MAX_LENGTHS = {
  TITLE: 255,
  BODY: 1_000,
}

const schema = z.object({
  entryId: z.string().optional(),
  id: zIntInRange('ID', ID.MIN, ID.MAX),
  title: zLimitedText('タイトル', MAX_LENGTHS.TITLE),
  body: zLimitedText('本文', MAX_LENGTHS.BODY),
  publicAt: z.any().refine((value) => isValid(value), {
    message: '公開日の日付を正しく入力してください',
  }),
  views: zIntInRange('閲覧数', VIEWS.MIN, VIEWS.MAX),
})

export default schema
