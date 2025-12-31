## 概要

この `AGENTS.md` は、Cursor等のAIエージェントが **このリポジトリ（Astro製ポートフォリオ）** を扱うための運用ルールをまとめたものです。

---

## Project overview

- **対象**: Astro + React + TypeScript + Tailwind CSS の静的ポートフォリオサイト
- **出力**: `astro.config.mjs` の `output: "static"` により静的生成（成果物は `dist/`）
- **フォーマット**:
  - Prettier を使用（`.prettierrc` / `prettier-plugin-astro`）
  - pre-commit で `lint-staged` が走り、`prettier --check` が必須（`.husky/pre-commit` / `.lintstagedrc.cjs`）

### ディレクトリ構造（実態に準拠）

- **`public/`**: 静的アセット（画像・アイコン・work配下の素材）
- **`src/pages/`**: ルーティング（例: `index.astro`, `work/[slug].astro`）
- **`src/layouts/`**: レイアウト（例: `BaseLayout.astro`）
- **`src/components/astro/`**: Astroコンポーネント（例: `Header.astro`）
- **`src/components/react/`**: Reactアイランド（例: `MobileMenu.tsx`、Astro側から `client:*` で利用）
- **`src/data/`**: 表示データ（例: `profile.ts`, `works.ts`）
- **`src/styles/`**: グローバルCSS（例: `global.css`）
- **`src/types/`**: 型定義（例: `src/types/index.ts`）

---

## Base rules（AI運用の基本）

### 方針

- **可読性優先**: 小さく分割し、意図が読める実装にする
- **推測で決めない**: 仕様・文言・デザインは不明点を確認する
- **設定に従う**: フォーマットは Prettier を正とする（手整形で崩さない）

### 変更時の優先順位

1. **既存実装（コンポーネント/データ構造）**
2. **設定ファイル（`astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, Prettier/Husky）**
3. **READMEなどのドキュメント**

---

## Coding rules（Astro/React/TS/Tailwindに合わせる）

### 共通（全ファイル）

- **インデント/整形**: Prettier を尊重（pre-commit で `prettier --check` が走る）
- **命名**:
  - **Astro/Reactコンポーネント**: 現状に合わせて **`PascalCase` ファイル名**（例: `Header.astro`, `MobileMenu.tsx`）
  - **データ/ユーティリティ**: `lowerCamelCase` / `camelCase` を基本（例: `works.ts`）
  - **画像などの静的ファイル**: **`kebab-case`**（例: `menu_open.svg`, `example_01.webp`）

### TypeScript / React

- **型**: `any` を避け、`src/types/` を基準に型を揃える
- **Reactはアイランド前提**: Astro側で `client:*` 指定して必要最小限だけ動かす

### Astro

- **Props**: `interface Props` を定義し、`Astro.props` を明示的に分解する（既存 `BaseLayout.astro` 方式に合わせる）
- **言語**: `lang="ja"` を維持（`BaseLayout.astro` 準拠）

### Tailwind / CSS

- **Tailwind v3** を前提（`@astrojs/tailwind`）
- **任意値（`[...]`）は許可**: 既存で `calc(...)` や `z-[...]` 等を使用しているため禁止しない
- **再利用**: 同じ任意値が増殖する場合は、`src/styles/global.css` のCSS変数や `tailwind.config.mjs` の `theme.extend` への寄せを検討する

---

## Action rules：create-component（Astro/React向け）

- **description**: 対話型でコンポーネント作成フローを開始するためのルール
- **alwaysApply**: `false`
- **triggers**: `["コンポーネントつくりたい！"]`

このルールが適用されたら、最初に「コンポーネントつくっちゃうよー！！」と宣言すること。

### 実行前の対話ステップ（重要：一括質問禁止）

以下を **必ず順番にひとつずつ** 質問し、回答を受けてから次へ進むこと。

1. **作成場所の確認**: `src/components/astro/` か `src/components/react/` のどちらか（必要ならサブディレクトリも）
2. **役割/名称の確認**: UI上の役割（例: Header, WorkCard, ContactCTA など）
3. **ファイル名の確認**:
   - Astro: `PascalCase.astro`
   - React: `PascalCase.tsx`
   - **[バリデーション]**: `kebab-case` 等で来たら、規約に合わせて修正してよいか確認する
4. **Propsの有無**: 受け取るProps（有り/無し、あるなら項目名と型）

### 実装フェーズ（テンプレートのみ、推測で肉付け禁止）

- **HTML/テキスト/デザインは推測で入れない**（構造だけ）
- 既存のフォーマットを崩さない（Prettier前提）

#### Astroコンポーネント（Propsあり）

```astro
---
interface Props {
  // TODO: Propsを定義
}

const {} = Astro.props;
---

<div>
  <!-- TODO: Markup -->
</div>
```

#### Reactコンポーネント（Propsあり）

```tsx
import type { ReactNode } from "react";

interface Props {
  // TODO: Propsを定義
  children?: ReactNode;
}

export default function ComponentName({ children }: Props) {
  return <div>{children}</div>;
}
```

---

## Action rules：create-pr

- **description**: PR作成フロー。差分確認・未レビュー時のレビュー移行・テンプレート出力を行う
- **alwaysApply**: `false`
- **triggers**: `["PR作って", "プルリク作成", "プルリクエスト作成"]`

このルールが適用されたら、最初に「PRつくっちゃうよー！！」と宣言すること。

### ステップ1：現状確認

1. `git status` で未コミットの変更を確認
2. `git diff main...HEAD`（または適切な比較）で変更点を把握
3. 未コミットの有無を報告

### ステップ2：レビュー状況の確認

ユーザーに「レビューは完了していますか？」と確認すること。

- 未レビューなら、直ちに **Action rules：start-review** を実行し、指摘修正完了までPR本文生成へ進まない

### ステップ3：変更内容の要約

差分と会話履歴から、変更の目的と内容を日本語で要約すること。

### ステップ4：PR本文の生成（コピペ用）

`.github/PULL_REQUEST_TEMPLATE.md` を読み込み、そのフォーマットに沿って **1つのコードブロック** にまとめて出力すること。

---

## Action rules：start-review（Astro/Tailwind/TS準拠）

- **description**: コードレビュー・品質チェックのための運用ガイド
- **alwaysApply**: `false`
- **triggers**: `["レビューして"]`

適用時は必ず冒頭で「レビューはっじめるよー！！」と宣言すること。

### 重点チェックリスト

- **Prettier適合**: 変更ファイルが `prettier --check` を通ること（pre-commit相当）
- **Astroの責務分離**: Reactを必要最小限のアイランドとして使えていること（`client:*` の乱用を避ける）
- **TypeScriptの整合**: `src/types/` とデータ (`src/data/`) の型が矛盾しないこと
- **Tailwindの一貫性**: 任意値の乱立を避け、必要ならCSS変数/テーマ拡張へ寄せる
- **アクセシビリティ**: `alt`, `aria-*` 等が妥当で、ナビゲーション構造が崩れていないこと

### レビュー回答フォーマット

#### ⚠️ 指摘・修正提案

1. **対象コード引用（原文）**
2. **指摘内容（理由/影響）**
3. **修正例**

#### 🏆 総合評価

- 規約準拠状況を記載
- 指摘がなければ「LGTM（修正不要）」と明記
