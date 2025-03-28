import { z } from 'zod'

export const zIntInRange = (label: string, min: number, max: number) =>
  z.coerce
    .number({
      invalid_type_error: `${label}は整数で入力してください`,
    })
    .int({ message: `${label}は整数で入力してください` })
    .min(min, { message: `${label}は${min}以上で入力してください` })
    .max(max, { message: `${label}は${max}以下で入力してください` })

export const zLimitedText = (label: string, max: number) =>
  z
    .string()
    .nonempty(`${label}は必須項目です`)
    .max(max, { message: `${label}は${max}文字以内で入力してください` })
