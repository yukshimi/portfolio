---
slug: "portfoli"
category: "Design/Development"
year: 2026
company: "副業"
title: "ポートフォリオサイトの実装"
projectTitle: "ポートフォリオサイトの実装"
description: "これまでの実績を分かりやすくまとめるため、Astro＋Reactでポートフォリオサイトを実装。AI活用で実装を効率化し、短期間（約2日）で公開まで到達しました。"
thumbnail: "/work/portfolio/thumbnail.avif"
---

![](/work/portfolio/main.avif)

## 技術スタック

シンプルなポートフォリオとして要件に過不足がない構成を検討し、以下の組み合わせで実装しました。

- フレームワーク
  - Astro + React + TypeScript
- スタイリング
  - Tailwind CSS
- デプロイ方法
  - Cloudflare
- 画像拡張子
  - AVIF
- その他
  - Prettier
  - Husky

AstroとCloudflareは初めての使用でしたが、学習コストが低く、作業効率を高めてくれました。

AstroでSSGとしてサイトを生成し、軽量なAVIF画像を採用したことで、ページ表示速度も良好な結果を得られました。

![](/work/portfolio/01.avif)

## AI活用

積極的にAIを活用し、作業の効率化に取り組みました。

具体的には、Cursorのルールを詳細に整備して生成コードの精度を上げ、作業を効率化しました。
また、プロンプト入力には音声入力ツール（Aqua Voice）を併用し、詳細な指示を簡単かつ迅速に指定できるようにしました。

![](/work/portfolio/02.avif)

## デザインの工夫

シンプルな構成を保ちつつ、画像を多めに配置して「何をやったか」が直感的に伝わるようにしました。

文字の見え方にもこだわり、以下の微調整を実施しました。

- 記号や英字等の文字詰め
- 文字間・行間の微調整
- 日英で違うフォントを組み合わせつつ、英字用のフォントサイズを少し大きく
- タイトルテキストの上下余白をカットして、テキストと他の要素の上部が揃うように

![](/work/portfolio/03.avif)
