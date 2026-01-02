import { getCollection } from "astro:content";
import type { Work } from "../types";

/**
 * スラッグからワークを取得する関数
 */
export async function getWorkBySlug(slug: string): Promise<Work | undefined> {
  const works = await getAllWorks();
  return works.find((work) => work.slug === slug);
}

/**
 * すべてのワークを取得する関数
 */
export async function getAllWorks(): Promise<Work[]> {
  const entries = await getCollection("works");

  return entries.map((entry) => ({
    slug: entry.slug,
    category: entry.data.category,
    year: entry.data.year,
    company: entry.data.company,
    title: entry.data.title,
    thumbnailTitle: entry.data.thumbnailTitle,
    projectTitle: entry.data.projectTitle,
    description: entry.data.description,
    detailTitle: entry.data.detailTitle,
    detailDescription: entry.data.detailDescription,
    thumbnail: entry.data.thumbnail,
    tags: entry.data.tags,
    link: entry.data.link,
    content: entry.data.content,
  }));
}
