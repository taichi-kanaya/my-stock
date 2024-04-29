"use server";

import { RegistFormData } from "@/app/features/stocks/types/index";
import { convertToIsoUtc } from "@/app/utils/date";
import * as contentful from "contentful-management";

export async function registContents(data: RegistFormData): Promise<boolean> {
  try {
    // Contentfulの環境情報を取得する
    const client = contentful.createClient({
      accessToken: process.env.CMA_ACCESS_TOKEN!!,
    });
    const cfSpace = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!!);
    const cfEnvironment = await cfSpace.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT_ID!!,
    );

    // Contentfulにコンテンツを登録する
    const cfEntry = await cfEnvironment.createEntry(
      process.env.CONTENTFUL_CONTENT_TYPE_ID!!,
      {
        fields: {
          id: {
            "ja-JP": Number(data.id),
          },
          title: {
            "ja-JP": data.title,
          },
          body: {
            "ja-JP": {
              nodeType: "document",
              data: {},
              content: [
                {
                  nodeType: "paragraph",
                  content: [
                    {
                      nodeType: "text",
                      value: data.body,
                      data: {},
                      marks: [],
                    },
                  ],
                  data: {},
                },
              ],
            },
          },
          public_at: {
            "ja-JP": convertToIsoUtc(data.public_at),
          },
          views: {
            "ja-JP": Number(data.views),
          },
        },
      },
    );

    // 記事を公開する
    await cfEntry.publish();

    console.log("Content registered successfully:", cfEntry);
    return true;
  } catch (error) {
    console.error("Error registering content:", error);
    return false;
  }
}
