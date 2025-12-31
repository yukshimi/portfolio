# Portfolio - Astro + React + TypeScript

モダンな技術スタックで構築されたミニマルなポートフォリオサイトです。

## 🚀 技術スタック

- **Astro**: 静的サイト生成フレームワーク
- **React**: インタラクティブなUIコンポーネント
- **TypeScript**: 型安全性の確保

## 📁 プロジェクト構成

```
portfolio/
├── public/              # 静的ファイル（画像など）
├── src/
│   ├── components/     # コンポーネント
│   │   ├── astro/      # Astroコンポーネント
│   │   └── react/      # Reactコンポーネント
│   ├── data/           # データファイル
│   ├── layouts/        # レイアウト
│   ├── pages/          # ページ
│   ├── styles/         # スタイル
│   └── types/          # TypeScript型定義
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

### ワークの追加

`src/data/works.ts` に新しいワークオブジェクトを追加してください：

```typescript
{
  slug: 'my-work',
  title: 'My Work',
  category: 'Design',
  year: 2024,
  description: 'Work description...',
  thumbnail: '/work/my-work/thumbnail.webp',
  images: ['/work/my-work/img1.webp', ...],
}
```

### プロフィール情報の変更

`src/data/profile.ts` を編集してください。

### スタイルのカスタマイズ

`src/styles/global.css` を編集してください。CSS変数を使用しているため、簡単にカスタマイズできます。

## 📚 ドキュメント

- [提案書](./PROPOSAL.md): プロジェクト構成の詳細な提案
- [移行ガイド](./MIGRATION_GUIDE.md): 既存サイトからの移行手順

## 🎨 特徴

- **パフォーマンス**: Astroの静的生成により、超高速なサイト
- **型安全性**: TypeScriptでデータの整合性を保証
- **コンポーネント化**: 再利用可能なコンポーネント設計
- **レスポンシブ**: モバイルファーストなデザイン
- **SEO最適化**: 静的生成により、SEOに最適

## 📄 ライセンス

このプロジェクトは元のテンプレート「Manifesto」をベースにしています。
