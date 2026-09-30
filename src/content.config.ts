import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Content Collections（コンテンツコレクション）とは：
 * - src/content 配下の Markdown などを「型付きデータ」として扱える仕組み
 * - frontmatter（--- の中）を schema で検証できるので、入力ミスに強い
 * - frontmatter の `slug` がエントリの id（= URL）になる
 */

const works = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/works" }),
  schema: z.object({
    category: z.string(),
    year: z.number(),
    company: z.string(),
    title: z.string(),
    projectTitle: z.string().optional(),
    description: z.string(),
    detailTitle: z.string().optional(),
    detailDescription: z.string().optional(),
    thumbnail: z.string(),
    url: z.string().optional(),
  }),
});

export const collections = { works };
