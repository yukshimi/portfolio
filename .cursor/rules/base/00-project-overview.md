---
description: プロジェクト全体の構造・技術・ディレクトリ方針定義（Astroポートフォリオ）
globs: ["**/*"]
alwaysApply: true
---

# プロジェクト概要

## 対象

- Astro + React + TypeScript + Tailwind CSS の静的ポートフォリオサイト
- `astro.config.mjs` は `output: "static"`（成果物は `dist/`）

## ディレクトリ構造（実態に準拠）

- `public/`: 静的アセット（画像・アイコン・work配下の素材）
- `src/pages/`: ルーティング（例: `index.astro`, `work/[slug].astro`）
- `src/layouts/`: レイアウト（例: `BaseLayout.astro`）
- `src/components/astro/`: Astroコンポーネント
- `src/components/react/`: Reactアイランド（Astro側から `client:*` で利用）
- `src/data/`: 表示データ（`profile.ts`, `works.ts` 等）
- `src/styles/`: グローバルCSS（`global.css`）
- `src/types/`: 型定義（`src/types/index.ts`）

## フォーマット

- Prettier を使用（`.prettierrc` / `prettier-plugin-astro`）
- pre-commit で `lint-staged` が走り、`prettier --check` が必須（`.husky/pre-commit` / `.lintstagedrc.cjs`）
