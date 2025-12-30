import type { Work, WorkContent } from '../types';

/**
 * ワークデータの配列
 * ここに作品情報を追加していきます
 */
export const works: Work[] = [
  {
    slug: 'salesmarker-web',
    category: 'Web Design / Development',
    year: 2024,
    company: '株式会社Sales Marker',
    title: 'Sales MarkerのWEBサイト運用・改善',
    thumbnailTitle: 'Sales Marker<br>WEBサイト運用・改善',
    projectTitle: 'Sales MarkerのWEBサイト運用・改善',
    description: 'いい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きます',
    thumbnail: '/work/salesmarker-web/thumbnail.avif',
    tags: ['Web Design', 'Web Development', 'WordPress'],
    content: [
      { type: 'image', src: '/work/example/img/example_01.webp', alt: 'Sales Marker - Main view' },
      { type: 'text', content: '  ' },
      { type: 'image', src: '/work/example/img/example_02.webp', alt: 'Sales Marker - Feature 1' },
      { type: 'text', content: 'いい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きますいい感じの説明を書きます' },
      { type: 'image', src: '/work/example/img/example_03.webp', alt: 'Sales Marker - Feature 2' },
    ] as WorkContent[],
  },
];

/**
 * スラッグからワークを取得する関数
 */
export function getWorkBySlug(slug: string): Work | undefined {
  return works.find(work => work.slug === slug);
}

/**
 * すべてのワークを取得する関数
 */
export function getAllWorks(): Work[] {
  return works;
}

