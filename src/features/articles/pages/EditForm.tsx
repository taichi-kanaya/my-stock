'use client'

import { useState } from 'react'

import { parse } from 'date-fns'
import { Controller, SubmitHandler, useFormState } from 'react-hook-form'

import Button from '@/components/basic/Button'
import DatePickerWithLocale from '@/components/basic/DatePicker'
import Hidden from '@/components/basic/Hidden'
import Label from '@/components/basic/Label'
import Link from '@/components/basic/Link'
import NotificationMessage from '@/components/basic/NotificationMessage'
import TextArea from '@/components/basic/TextArea'
import TextInput from '@/components/basic/TextInput'
import ValidationErrorMessage from '@/components/basic/ValidationErrorMessage'
import { ARTICLE_MAX_LENGTHS } from '@/constants/validation'
import useArticleForm from '@/features/articles/hooks/useArticleForm'
import { ArticleFormData } from '@/features/articles/types'

import { updateContents } from '../actions/updateContents'

type EditFormProps = {
  entryId: string
  id: string
  title: string
  body: string
  publicAt: string
  views: string
}

const EditForm: React.FC<EditFormProps> = ({ entryId, id, title, body, publicAt, views }) => {
  // 記事登録
  const onSubmit: SubmitHandler<ArticleFormData> = async (data: ArticleFormData) => {
    setMessage('')
    const isSuccess = await updateContents(data)
    setIsSuccess(isSuccess)
    if (isSuccess) {
      setMessage('記事の更新が完了しました。')
    } else {
      setMessage('記事の更新に失敗しました。恐れ入りますが、時間を空けてもう１度お試しください。')
    }
  }

  const { control, register, handleSubmit } = useArticleForm({
    entryId,
    id,
    title,
    body,
    publicAt: parse(publicAt, 'yyyy/MM/dd', new Date()),
    views,
  })
  const { errors } = useFormState({ control, name: ['title', 'body', 'publicAt', 'views'] })
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')
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
          <Label isRequire={false} htmlFor="id">
            ID
          </Label>
          <Label isRequire={false}>{id}</Label>
          <Hidden id={'h-id'} value={id} />
          <Hidden id={'h-entry-id'} value={entryId} {...register('entryId')} />
        </div>
        <div className="flex flex-col">
          <Label isRequire={true} htmlFor="title">
            タイトル
          </Label>
          <TextInput id="title" maxLength={ARTICLE_MAX_LENGTHS.TITLE} {...register('title')} />
          <ValidationErrorMessage>{errors.title?.message}</ValidationErrorMessage>
        </div>
        <div className="flex flex-col">
          <Label isRequire={true} htmlFor="body">
            本文
          </Label>
          <TextArea
            id="body"
            rows={10}
            maxLength={ARTICLE_MAX_LENGTHS.BODY}
            {...register('body')}
          />
          <ValidationErrorMessage>{errors.body?.message}</ValidationErrorMessage>
        </div>
        <div className="flex max-w-[200px] flex-col">
          <Label isRequire={true} htmlFor="publicAt">
            公開日
          </Label>
          <Controller
            name="publicAt"
            control={control}
            render={({ field }) => (
              <DatePickerWithLocale
                id="publicAt"
                selected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                dateFormat="yyyy年MM月dd日"
                popperPlacement="bottom-start"
              />
            )}
          />
          <ValidationErrorMessage>{errors.publicAt?.message}</ValidationErrorMessage>
        </div>
        <div className="flex flex-col">
          <Label isRequire={true} htmlFor="views">
            閲覧数
          </Label>
          <TextInput id="views" maxLength={ARTICLE_MAX_LENGTHS.VIEWS} {...register('views')} />
          <ValidationErrorMessage>{errors.views?.message}</ValidationErrorMessage>
        </div>
        <div className="space-x-4">
          <Button isPrimary={true} type="submit">
            更新する
          </Button>
          <Link href="/">トップへ戻る</Link>
        </div>
      </form>
    </div>
  )
}

export default EditForm
