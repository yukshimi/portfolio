import { defineCollection, z } from "astro:content";

/**
 * Content Collections（コンテンツコレクション）とは：
 * - src/content 配下の Markdown などを「型付きデータ」として扱える仕組み
 * - frontmatter（--- の中）を schema で検証できるので、入力ミスに強い
 */

const workContentSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("image"),
    src: z.string(),
    alt: z.string().optional(),
  }),
  z.object({
    type: z.literal("text"),
    content: z.string(),
  }),
  z.object({
    type: z.literal("list"),
    style: z.enum(["unordered", "ordered"]).optional(),
    items: z.array(z.string()).min(1),
  }),
]);

const worksCollection = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    year: z.number(),
    company: z.string(),
    title: z.string(),
    thumbnailTitle: z.string(),
    projectTitle: z.string().optional(),
    description: z.string(),
    detailTitle: z.string().optional(),
    detailDescription: z.string().optional(),
    thumbnail: z.string(),
    tags: z.array(z.string()).optional(),
    url: z.string().optional(),

    /** 作品詳細の“ブロック配列”は frontmatter 側で管理（Markdown本文は自由に使ってOK） */
    content: z.array(workContentSchema).default([]),
  }),
});

export const collections = {
  works: worksCollection,
};
