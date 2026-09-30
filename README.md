# Portfolio - Yuki Shimizu

## 🚀 技術スタック

- **Astro 7**: 静的サイト生成フレームワーク（Node.js 22.12 以上が必要）
- **React**: インタラクティブなUIコンポーネント
- **Tailwind CSS v4**: スタイリング（デザイントークンは `src/styles/global.css` の `@theme`）
- **TypeScript**: 型安全性の確保

## 📁 プロジェクト構成

```
portfolio/
├── public/              # 静的ファイル（画像など）
├── src/
│   ├── components/     # コンポーネント
│   │   ├── astro/      # Astroコンポーネント
│   │   └── react/      # Reactコンポーネント
│   ├── content/works/  # 作品のMarkdown
│   ├── data/           # データファイル（プロフィールなど）
│   ├── layouts/        # レイアウト
│   ├── pages/          # ページ
│   ├── scripts/        # クライアントサイドのスクリプト
│   ├── styles/         # スタイル
│   ├── types/          # TypeScript型定義
│   ├── utils/          # ユーティリティ関数
│   └── content.config.ts # コンテンツコレクションの定義
└── package.json
```

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:4321` を開いてください。

### 3. ビルド

```bash
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに出力されます。

### 4. プレビュー

```bash
npm run preview
```

ビルドされたサイトをローカルでプレビューできます。

## 📝 使い方

### お問い合わせフォーム（Cloudflare Pages）

フッターに `Contact` フォーム（`/api/contact` にPOST）があり、Cloudflare Pages Functions 経由でメール送信します。

Cloudflare Pages の環境変数に以下を設定してください：

- **`RESEND_API_KEY`**: Resend の API Key（必須）
- **`CONTACT_TO`**: 受信先メール（未設定なら `yukish1013@gmail.com`）
- **`CONTACT_FROM`**: 送信元（Resend 側で利用可能な From。未設定なら `Portfolio <onboarding@resend.dev>`）

Turnstile を使う場合（任意）：

- **`TURNSTILE_SECRET_KEY`**: Turnstile secret key（設定すると検証が有効になります）
- **`PUBLIC_TURNSTILE_SITE_KEY`**: Turnstile site key（Astro側でフォームにウィジェットを表示するために使用）

### ワークの追加

`src/content/works/` に Markdown ファイルを追加してください。frontmatter の項目は `src/content.config.ts` の schema で検証されます。

```markdown
---
slug: "my-work" # URL（/work/my-work/）になる
category: "Design"
year: 2024
company: "会社名"
title: "My Work"
description: "Work description..."
thumbnail: "/work/my-work/thumbnail.avif"
---

![](/work/my-work/main.avif)

本文...
```

### プロフィール情報の変更

`src/data/profile.ts` を編集してください。

### スタイルのカスタマイズ

`src/styles/global.css` を編集してください。

## 📄 ライセンス

このプロジェクトは元のテンプレート「Manifesto」をベースにしています。
