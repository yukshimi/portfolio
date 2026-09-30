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
 * 経歴（キャリア）1件分の型定義
 */
export interface Career {
  /** 期間（例: "2023 – 現在"） */
  period: string;
  /** 会社名・組織名 */
  company: string;
  /** 役職・立場（オプション） */
  role?: string;
  /** 業務内容など（オプション） */
  description?: string;
}

/**
 * プロフィール情報の型定義
 */
export interface Profile {
  /** 名前 */
  name: string;
  /** 役職・職業 */
  role: string;
  /** 経歴（新しい順に並べる） */
  careers: Career[];
  /** 使用ツール・スキル */
  skills: string[];
  /** 保有資格 */
  qualifications: string[];
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
