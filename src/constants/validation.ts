export const ARTICLE_MAX_LENGTHS = {
  ID: 11,
  TITLE: 255,
  BODY: 1000,
  VIEWS: 11,
}

export const MESSAGES = {
  REQUIRED: '必須項目です',
  MAX_LENGTH_NUM: (length: number) => `${length}桁以内で入力してください`,
  MAX_LENGTH_TEXT: (length: number) => `${length}文字以内で入力してください`,
  INVALID_DATE: '日付を正しく入力してください',
}
