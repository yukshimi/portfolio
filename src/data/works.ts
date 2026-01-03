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

  const sortedEntries = [...entries].sort((a, b) => {
    // year: desc (newest first)
    const yearDiff = b.data.year - a.data.year;
    if (yearDiff !== 0) return yearDiff;

    // title: asc (stable ordering for same year)
    const titleDiff = a.data.title.localeCompare(b.data.title, "ja");
    if (titleDiff !== 0) return titleDiff;

    // slug: asc (final tie-breaker)
    return a.slug.localeCompare(b.slug, "ja");
  });

  return sortedEntries.map((entry) => ({
    slug: entry.slug,
    category: entry.data.category,
    year: entry.data.year,
    company: entry.data.company,
    title: entry.data.title,
    projectTitle: entry.data.projectTitle,
    description: entry.data.description,
    detailTitle: entry.data.detailTitle,
    detailDescription: entry.data.detailDescription,
    thumbnail: entry.data.thumbnail,
    url: entry.data.url,
  }));
}
