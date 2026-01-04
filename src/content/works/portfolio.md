---
slug: "portfoli"
category: "WebDesign/Development"
year: 2026
company: "副業"
title: "ポートフォリオサイトの実装"
projectTitle: "ポートフォリオサイトの実装"
description: "今までの仕事内容をわかりやすくまとめたポートフォリオサイトを作成しました。新しい技術にもチャレンジしたく、AstroとCloudflareを初めて利用。AIを使って効率化することで、実装は2日ほどで終わらせることができました。"
thumbnail: "/work/portfolio/thumbnail.png"
---

![](/work/portfolio/main.png)

## 技術スタック

簡易なポートフォリオとして適切な技術スタックを検討し、以下の組み合わせで実装。

- フレームワーク
  - Astro + React + TypeScript
- スタイリング
  - Tailwind.css
- デプロイ方法
  - Cloudflare
- 画像拡張子
  - AVIF
- その他
  - Prettier
  - Husky

AstroとCloudflareは初めての使用でしたが、非常に使いやすく、作業効率を高めてくれました。

AstroでSSGとしてサイト生成、AVIF形式の画像の利用の影響もあり、ページ表示速度も良好な結果になりました。

![](/work/portfolio/01.png)

## AI活用

積極的にAIを活用することで、作業の効率向上に取り組みました。

具体的には、CursorRulesの詳細な設計をすることで、Cursorが生成するコードの精度を向上。
また、プロンプトの入力には、音声入力ツールのAqua Voiceを使用し、詳細な指示を簡単かつ迅速に指定できるようにしました。

![](/work/portfolio/02.png)

## デザインの工夫

全体的にシンプルな構成、デザインを意識しつつ、画像を多めにして、今までの仕事内容を簡単に把握できるように意識しました。

文字の表示にこだわり、以下の微調整を実施。

- 記号や英字等の文字詰め
- 文字間・行間の微調整
- 日英で違うフォントを組み合わせつつ、英字用のフォントサイズを少し大きく
- タイトルテキストの上下余白をカットして、テキストと他の要素の上部が揃うように

![](/work/portfolio/03.png)
