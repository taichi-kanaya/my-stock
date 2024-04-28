"use server";

import { newFormData } from "@/app/features/stocks/types/index";

export async function registContents(data: newFormData) {
  console.log(data);
  console.log("サーバコンポーネント入ったよ");
}
