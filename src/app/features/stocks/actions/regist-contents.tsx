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
    const cf_space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!!);
    const cf_environment = await cf_space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT_ID!!,
    );

    // Contentfulにコンテンツを登録する
    const cf_entry = await cf_environment.createEntry(
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
    cf_entry.publish();

    console.log("Content registered successfully:", cf_entry);
    return true;
  } catch (error) {
    console.error("Error registering content:", error);
    return false;
  }
}
