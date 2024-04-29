"use client";
import Link from "next/link";
import DatePickerWithLocale from "@/app/components/common/datepicker-with-locale";
import yup, { object, string, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { format, isValid } from "date-fns";
import { registContents } from "@/app/features/stocks/actions/regist-contents";
import { ValidationMessages } from "@/app/constants/validation";
import { RegistFormData } from "@/app/features/stocks/types";
import { useState } from "react";

// バリデーションルールの定義
const schema = object().shape({
  id: string()
    .required(ValidationMessages.REQUIRED)
    .max(11, ValidationMessages.MAX_LENGTH_NUM(11)),
  title: string()
    .required(ValidationMessages.REQUIRED)
    .max(255, ValidationMessages.MAX_LENGTH_TEXT(255)),
  body: string()
    .required(ValidationMessages.REQUIRED)
    .max(1000, ValidationMessages.MAX_LENGTH_TEXT(1000)),
  public_at: date()
    .required(ValidationMessages.REQUIRED)
    .test("isValidDate", ValidationMessages.INVALID_DATE, (value) => {
      return isValid(value);
    }),
  views: string()
    .required(ValidationMessages.REQUIRED)
    .max(11, ValidationMessages.MAX_LENGTH_NUM(11)),
});
type FormData = yup.InferType<typeof schema>;

export default function Form() {
  const formStyle =
    "focus:shadow-outline border border-gray-300 bg-white p-2 leading-tight text-gray-700 focus:outline-none";

  const { control, register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setMessage("");
    // 公開日を文字列にフォーマットしてServer Actionsへ渡す
    const modifiedData: RegistFormData = {
      ...data,
      public_at: format(data.public_at, "yyyyMMdd"),
    };
    const isSuccess = await registContents(modifiedData);
    setIsSuccess(isSuccess);
    if (isSuccess) {
      setMessage("記事の登録が完了しました。");
    } else {
      setMessage(
        "記事の登録に失敗しました。恐れ入りますが、時間を空けてもう１度お試しください。",
      );
    }
  };

  return (
    <div>
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onSubmit)}>
        {message != "" ? (
          isSuccess ? (
            <div className="rounded border border-blue-500 bg-blue-100 px-4 py-3 text-blue-700">
              <p className="text-sm">{message}</p>
            </div>
          ) : (
            <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
              <span className="block sm:inline">{message}</span>
            </div>
          )
        ) : (
          ""
        )}
        <div className="flex flex-col">
          <label
            htmlFor="id"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            ID <span className="text-red-500">*</span>
          </label>
          <input className={formStyle} maxLength={11} {...register("id")} />
          <span className="text-red-500">{formState.errors.id?.message}</span>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            タイトル <span className="text-red-500">*</span>
          </label>
          <input className={formStyle} maxLength={255} {...register("title")} />
          <span className="text-red-500">
            {formState.errors.title?.message}
          </span>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="body"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            本文 <span className="text-red-500">*</span>
          </label>
          <textarea className={formStyle} {...register("body")} />
          <span className="text-red-500">{formState.errors.body?.message}</span>
        </div>
        <div className="flex max-w-[200px] flex-col">
          <label
            htmlFor="public_at"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            公開日 <span className="text-red-500">*</span>
          </label>
          <Controller
            name="public_at"
            control={control}
            render={({ field }) => (
              <DatePickerWithLocale
                selected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                dateFormat="yyyy年MM月dd日"
                className={formStyle}
                popperPlacement="bottom-start"
              />
            )}
          />
          <span className="text-red-500">
            {formState.errors.public_at?.message}
          </span>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="views"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            閲覧数 <span className="text-red-500">*</span>
          </label>
          <input className={formStyle} maxLength={11} {...register("views")} />
          <span className="text-red-500">
            {formState.errors.views?.message}
          </span>
        </div>
        <div className="space-x-4">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            登録する
          </button>
          <Link href="/">
            <button className="my-10 rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-600">
              トップへ戻る
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
