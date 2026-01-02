/**
 * ワーク（作品）の型定義
 */
export interface Work {
  /** スラッグ（URLに使用） */
  slug: string;
  /** タイトル */
  title: string;
  /** サムネイルタイトル */
  thumbnailTitle: string;
  /** 会社名 */
  company: string;
  /** カテゴリー */
  category: string;
  /** 制作年 */
  year: number;
  /** 説明文 */
  description: string;
  /** 詳細ページ用のタイトル（オプション、未指定の場合はtitleを使用） */
  detailTitle?: string;
  /** 詳細ページ用の説明文（オプション、未指定の場合はdescriptionを使用） */
  detailDescription?: string;
  /** プロジェクトタイトル（h2に表示、オプション） */
  projectTitle?: string;
  /** サムネイル画像のパス */
  thumbnail: string;
  /** タグ（オプション） */
  tags?: string[];
  /** 外部URL（オプション） */
  url?: string;
}

/**
 * プロフィール情報の型定義
 */
export interface Profile {
  /** 名前 */
  name: string;
  /** 役職・職業 */
  role: string;
  /** 自己紹介文 */
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
  /** お問い合わせURL（オプション） */
  contactUrl?: string;
}
