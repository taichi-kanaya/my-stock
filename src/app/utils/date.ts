import { parse, formatISO } from "date-fns";

// 日付形式をチェックする
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

// ISO 8601形式のUTC日付文字列に変換
export function convertToIsoUtc(
  dateStr: string,
  format: string = "yyyyMMdd",
): string {
  const date = parse(dateStr, format, new Date());
  return formatISO(date, { representation: "complete" });
}
