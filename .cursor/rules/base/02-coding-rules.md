---
description: Astro + React + TypeScript + Tailwind CSS 実装ルール集（このリポジトリ用）
globs: ["**/*.{astro,ts,tsx,js,jsx,css,md,json,mjs,cjs}"]
alwaysApply: true
---

# Coding rules（Astro/React/TS/Tailwind）

## 命名

- コンポーネント（Astro/React）は `PascalCase`（例: `Header.astro`, `MobileMenu.tsx`）
- データ/ユーティリティは `camelCase`（例: `works.ts`）
- 画像など静的ファイルは `kebab-case`（例: `menu_open.svg`, `example_01.webp`）

## TypeScript / React

- `any` を避け、`src/types/` を基準に型を揃える
- Reactは必要最小限のアイランドにする（Astro側で `client:*` を付ける）

## Astro

- Propsは `interface Props` を定義し、`Astro.props` を明示的に分解する（`BaseLayout.astro` の方式に合わせる）
- `lang="ja"` を維持する（`BaseLayout.astro` 準拠）

## Tailwind / CSS

- Tailwind v3 前提（`@astrojs/tailwind`）
- 任意値（`[...]`）は既存で使用しているため許可（乱立するならCSS変数や `theme.extend` に寄せる）
