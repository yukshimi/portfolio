import type { CollectionEntry } from "astro:content";

/**
 * ワーク（作品）の型定義
 * - 項目は src/content.config.ts の schema から自動で導出される
 */
export type Work = CollectionEntry<"works">["data"] & {
  /** スラッグ（URLに使用） */
  slug: string;
};

/**
 * プロフィール情報の型定義
 */
export interface Profile {
  /** 名前 */
  name: string;
  /** 役職・職業 */
  role: string;
  /** 自己紹介文（HTML） */
  bio: string;
  /** インタビューURL */
  interviewUrls: {
    name: string;
    url: string;
  }[];
  /** アバター画像のパス */
  avatar: string;
  /** SNSリンク */
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
}
