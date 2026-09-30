import type { Profile } from "../types";

/**
 * プロフィール情報
 */
export const profile: Profile = {
  name: "Yuki Shimizu",
  role: "Product Designer / PdM",
  careers: [
    {
      period: "2026 – 現在",
      company: "スマサテ株式会社",
      role: "プロダクトデザイナー / PdM",
      description:
        "新規施策の企画・立案からデザインまで、プロダクト開発を一気通貫で推進。ブランディングやマーケティングに関わるデザインも担当。",
    },
    {
      period: "2023 – 2026",
      company: "株式会社Sales Marker",
      role: "ブランディングデザイン部 部長",
      description:
        "1人目のデザイナーとして入社し、組織づくりをしながら、プロダクトデザイン、ブランディング、マーケティング等を推進。ブランディングデザイン部の部長として幅広い業務を担当。",
    },
    {
      period: "2021",
      company: "株式会社スタンバイ（出向）",
      role: "デザイナー / PM",
      description:
        "少人数チームでサービス改善を推進し、年間約200本のABテストを実施。",
    },
    {
      period: "2013",
      company: "ヤフー株式会社",
      role: "ウェブデザイナー / フロントエンドエンジニア",
      description:
        "ショッピング、ニュース、天気等のサービスのデザインや実装を担当。",
    },
    {
      period: "2013",
      company: "慶應義塾大学",
      role: "卒業",
    },
  ],
  skills: [
    "Figma",
    "Illustrator",
    "Photoshop",
    "STUDIO",
    "WordPress",
    "Astro",
    "React",
    "Vue",
    "TypeScript",
  ],
  qualifications: ["宅地建物取引士", "応用情報技術者", "TOEIC 940点"],
  avatar: "/img/avatar.avif",
  interviewUrls: [
    {
      name: "インタビュー動画",
      url: "https://www.youtube.com/watch?v=QOkSmzMe1xQ",
    },
    {
      name: "インタビュー記事",
      url: "https://note.sales-marker.jp/n/nd7d2a1119a08",
    },
  ],
  socialLinks: [
    {
      platform: "Instagram",
      url: "https://www.instagram.com/yukshimi/",
      icon: "/img/icon/instagram.svg",
    },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/yuki.shimizu.737",
      icon: "/img/icon/facebook.svg",
    },
    {
      platform: "Twitter",
      url: "https://x.com/yuukirinrin",
      icon: "/img/icon/twitter_x.svg",
    },
  ],
};
