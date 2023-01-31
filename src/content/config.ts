// z は Zod

// contentは、自分でMarkDownを書いて記事を管理する
// pageでcontentを取得して表示させることが出来る

import { z, defineCollection } from 'astro:content'
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    // author: z.string().optional(), // 必須じゃない
    author: z.enum(['Akio', 'John']), // ユニオン型
    description: z.string(),
    publishDate: z.string().transform(str => new Date(str)),
  }),
})

// contentに存在する物を定義
export const collections = {
  blog,
}
