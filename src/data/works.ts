import type { Work, WorkContent } from "../types";

/**
 * ワークデータの配列
 * ここに作品情報を追加していきます
 */
export const works: Work[] = [
  {
    slug: "salesmarker-web",
    category: "Web Design / Development",
    year: 2024,
    company: "株式会社Sales Marker",
    title: "Sales MarkerのWEBサイト運用・改善",
    thumbnailTitle: "Sales Marker<br>WEBサイト運用・改善",
    projectTitle: "Sales MarkerのWEBサイト運用・改善",
    description:
      "いい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きます",
    thumbnail: "/work/salesmarker-web/thumbnail.avif",
    tags: ["Web Design", "Web Development", "WordPress"],
    content: [
      {
        type: "image",
        src: "/work/salesmarker-web/01.avif",
        alt: "Sales Marker - Main view",
      },
      {
        type: "text",
        content:
          "いい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きます",
      },
      {
        type: "image",
        src: "/work/salesmarker-web/02.avif",
        alt: "Sales Marker - Feature 1",
      },
      {
        type: "text",
        content:
          "いい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きます",
      },
      {
        type: "image",
        src: "/work/salesmarker-web/02.avif",
        alt: "Sales Marker - Feature 1",
      },
      {
        type: "text",
        content:
          "いい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きます",
      },
      {
        type: "image",
        src: "/work/salesmarker-web/02.avif",
        alt: "Sales Marker - Feature 1",
      },
      {
        type: "text",
        content:
          "いい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きます",
      },
    ] as WorkContent[],
  },
  {
    slug: "standby",
    category: "Web Design / Development",
    year: 2024,
    company: "スタンバイ株式会社",
    title: "求人サイト「Standby」の制作・改善",
    thumbnailTitle: "求人サイトStandby<br>制作・改善",
    projectTitle: "求人サイトStandbyの制作・改善",
    description:
      "いい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きます",
    thumbnail: "/work/stanby/thumbnail.avif",
    tags: ["Web Design", "Web Development", "WordPress"],
    content: [] as WorkContent[],
  },
  {
    slug: "Lunch Match",
    category: "App Design",
    year: 2024,
    company: "副業",
    title: "マッチングアプリ「Lunch Match」のデザイン",
    thumbnailTitle: "マッチングアプリ<br>Lunch Match<br>デザイン",
    projectTitle: "マッチングアプリLunch Matchのデザイン",
    description:
      "いい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きます",
    thumbnail: "/work/lunchmatch/thumbnail.avif",
    tags: ["Web Design", "Web Development", "WordPress"],
    content: [] as WorkContent[],
  },
];

/**
 * スラッグからワークを取得する関数
 */
export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

/**
 * すべてのワークを取得する関数
 */
export function getAllWorks(): Work[] {
  return works;
}
