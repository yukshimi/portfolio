import { getCollection } from "astro:content";
import type { Work } from "../types";

/**
 * すべてのワークを取得する関数
 * - 制作年の新しい順 → タイトル順 → スラッグ順で並べる
 */
export async function getAllWorks(): Promise<Work[]> {
  const entries = await getCollection("works");

  return entries
    .map((entry) => ({ ...entry.data, slug: entry.id }))
    .sort(
      (a, b) =>
        b.year - a.year ||
        a.title.localeCompare(b.title, "ja") ||
        a.slug.localeCompare(b.slug, "ja"),
    );
}
