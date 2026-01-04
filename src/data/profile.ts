import type { Profile } from "../types";

/**
 * プロフィール情報
 */
export const profile: Profile = {
  name: "Yuki Shimizu",
  role: "UI/UX Designer",
  bio: "2013年に慶應義塾大学を卒業し、ヤフー株式会社に入社。ショッピング、ニュース、天気等のサービスのデザインや実装を担当。<br>2021年からスタンバイ株式会社に出向し、デザイナー兼PMとしてサービスの改善に従事。<br>2023年にSales Marker株式会社に転職し、1人目のデザイナーとして組織作りをしながら、プロダクトデザイン、ブランディング、マーケティング等を推進。現在はブランディングデザイン部の部長として幅広い業務を担当。<br><br>保有資格：宅地建物取引士、応用情報技術者、TOEIC940点",
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
  contactUrl: "#contact",
};
