"use client";
import Link from "next/link";
import { useState } from "react";
import DatePickerWithLocale from "@/components/common/datepicker-with-locale";
import { isValidDate } from "@/utils/date";

// フォーム定義
interface FormData {
  id: string;
  title: string;
  body: string;
  public_at: Date | null;
  views: string;
}

// バリデーションエラー表示項目定義
interface FormErrors {
  id?: string;
  title?: string;
  body?: string;
  public_at?: string;
  views?: string;
  [key: string]: string | undefined;
}

export default function DetailedForm() {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    title: "",
    body: "",
    public_at: null,
    views: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // バリデーションチェック
  const validate = (): boolean => {
    let tempErrors: FormErrors = {};
    tempErrors.id =
      formData.id && /^\d{1,11}$/.test(formData.id)
        ? ""
        : "11桁までの数値を入力してください";
    tempErrors.title =
      formData.title && formData.title.length <= 255
        ? ""
        : "255文字までの文字列を入力してください";
    tempErrors.body =
      formData.body && formData.body.length <= 1000
        ? ""
        : "1000文字までの文字列を入力してください";

    console.log(formData.public_at);
    tempErrors.public_at =
      formData.public_at && isValidDate(formData.public_at.toISOString())
        ? ""
        : "日付を正しく入力してください";
    tempErrors.views =
      formData.views && /^\d{1,11}$/.test(formData.views)
        ? ""
        : "11桁までの数値を入力してください";
    setErrors(tempErrors);

    return Object.keys(tempErrors).every((key) => tempErrors[key] === "");
  };

  // 日付以外の入力値変更時ハンドラ
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // 日付入力値変更時ハンドラ
  const handleChangeDate = (date: Date | null): void => {
    setFormData({ ...formData, public_at: date });
  };

  // 登録ボタン押下時ハンドラ
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (validate()) {
      console.log("Valid Form Data:", formData);
    } else {
      console.log("Validation Error:", errors);
    }
  };

  // 入力フォームスタイル
  const formStyle =
    "focus:shadow-outline border border-gray-300 bg-white p-2 leading-tight text-gray-700 focus:outline-none";

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="flex flex-col">
          <label
            htmlFor="id"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className={formStyle}
            maxLength={11}
          />
          {errors.id && <p className="text-red-500">{errors.id}</p>}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={formStyle}
            maxLength={255}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="body"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            本文 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={10}
            className={formStyle}
            maxLength={1000}
          />
          {errors.body && <p className="text-red-500">{errors.body}</p>}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="public_at"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            公開日 <span className="text-red-500">*</span>
          </label>
          <DatePickerWithLocale
            selected={formData.public_at}
            onChange={handleChangeDate}
            dateFormat="yyyy年MM月dd日"
            className={formStyle}
          />
          {errors.public_at && (
            <p className="text-red-500">{errors.public_at}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="views"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            閲覧数 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="views"
            name="views"
            value={formData.views}
            onChange={handleChange}
            className={formStyle}
            min={0}
            max={999999999}
          />
          {errors.views && <p className="text-red-500">{errors.views}</p>}
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
