'use client'
import DatePickerWithLocale from '@/app/components/basic/DatePicker'
import yup, { object, string, date } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { format, isValid } from 'date-fns'
import { registContents } from '@/app/features/stocks/actions/regist-contents'
import { ValidationMessages } from '@/app/constants/validation'
import { RegistFormData } from '@/app/features/stocks/types'
import { useState } from 'react'
import Button from '@/app/components/basic/Button'
import Link from '@/app/components/basic/Link'
import Label from '@/app/components/basic/Label'
import ValidationErrorMessage from '@/app/components/basic/ValidationErrorMessage'
import TextInput from '@/app/components/basic/TextInput'
import TextArea from '@/app/components/basic/TextArea'
import NotificationMessage from '@/app/components/basic/NotificationMessage'

// バリデーションルールの定義
const schema = object().shape({
  id: string().required(ValidationMessages.REQUIRED).max(11, ValidationMessages.MAX_LENGTH_NUM(11)),
  title: string()
    .required(ValidationMessages.REQUIRED)
    .max(255, ValidationMessages.MAX_LENGTH_TEXT(255)),
  body: string()
    .required(ValidationMessages.REQUIRED)
    .max(1000, ValidationMessages.MAX_LENGTH_TEXT(1000)),
  public_at: date()
    .required(ValidationMessages.REQUIRED)
    .test('isValidDate', ValidationMessages.INVALID_DATE, (value) => {
      return isValid(value)
    }),
  views: string()
    .required(ValidationMessages.REQUIRED)
    .max(11, ValidationMessages.MAX_LENGTH_NUM(11)),
})
type FormData = yup.InferType<typeof schema>

export default function Form() {
  const { control, register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setMessage('')
    // 公開日を文字列にフォーマットしてServer Actionsへ渡す
    const modifiedData: RegistFormData = {
      ...data,
      public_at: format(data.public_at, 'yyyyMMdd'),
    }
    const isSuccess = await registContents(modifiedData)
    setIsSuccess(isSuccess)
    if (isSuccess) {
      setMessage('記事の登録が完了しました。')
    } else {
      setMessage('記事の登録に失敗しました。恐れ入りますが、時間を空けてもう１度お試しください。')
    }
  }

  return (
    <div>
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onSubmit)}>
        {message &&
          (isSuccess ? (
            <NotificationMessage type="info">{message}</NotificationMessage>
          ) : (
            <NotificationMessage type="error">{message}</NotificationMessage>
          ))}
        <div className="flex flex-col">
          <Label isRequire={true} htmlFor="id">
            ID
          </Label>
          <TextInput id="id" maxLength={11} {...register('id')} />
          <ValidationErrorMessage>{formState.errors.id?.message}</ValidationErrorMessage>
        </div>
        <div className="flex flex-col">
          <Label isRequire={true} htmlFor="title">
            タイトル
          </Label>
          <TextInput id="title" maxLength={255} {...register('title')} />
          <ValidationErrorMessage>{formState.errors.title?.message}</ValidationErrorMessage>
        </div>
        <div className="flex flex-col">
          <Label isRequire={true} htmlFor="body">
            本文
          </Label>
          <TextArea id="body" rows={10} maxLength={1000} {...register('body')} />
          <ValidationErrorMessage>{formState.errors.body?.message}</ValidationErrorMessage>
        </div>
        <div className="flex max-w-[200px] flex-col">
          <Label isRequire={true} htmlFor="public_at">
            公開日
          </Label>
          <Controller
            name="public_at"
            control={control}
            render={({ field }) => (
              <DatePickerWithLocale
                id="public_at"
                selected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                dateFormat="yyyy年MM月dd日"
                popperPlacement="bottom-start"
              />
            )}
          />
          <ValidationErrorMessage>{formState.errors.public_at?.message}</ValidationErrorMessage>
        </div>
        <div className="flex flex-col">
          <Label isRequire={true} htmlFor="views">
            閲覧数
          </Label>
          <TextInput id="views" maxLength={11} {...register('views')} />
          <ValidationErrorMessage>{formState.errors.views?.message}</ValidationErrorMessage>
        </div>
        <div className="space-x-4">
          <Button isPrimary={true} type="submit">
            登録する
          </Button>
          <Link href="/">トップへ戻る</Link>
        </div>
      </form>
    </div>
  )
}
