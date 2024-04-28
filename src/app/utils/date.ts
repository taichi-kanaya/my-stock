// 日付形式をチェックする
export function isValidDate(dateString: string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
