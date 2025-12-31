---
description: コードレビュー・品質チェックのための運用ガイド（Astro/Tailwind/TS準拠）
globs: ["**/*.{astro,ts,tsx,js,jsx,css,md,json,mjs,cjs}"]
alwaysApply: false
triggers: ["レビューして"]
---

# コードレビュー運用ガイド

適用時は必ず冒頭で「レビューはっじめるよー！！」と宣言すること。

## 重点チェックリスト

- Prettier適合: 変更ファイルが `prettier --check` を通ること（pre-commit相当）
- Astroの責務分離: Reactを必要最小限のアイランドとして使えていること（`client:*` の乱用を避ける）
- TypeScriptの整合: `src/types/` とデータ (`src/data/`) の型が矛盾しないこと
- Tailwindの一貫性: 任意値の乱立を避け、必要ならCSS変数/テーマ拡張へ寄せる
- アクセシビリティ: `alt`, `aria-*` 等が妥当で、ナビゲーション構造が崩れていないこと

## レビュー回答フォーマット

### ⚠️ 指摘・修正提案

1. **対象コード引用（原文）**
2. **指摘内容（理由/影響）**
3. **修正例**

### 🏆 総合評価

- 規約準拠状況を記載
- 指摘がなければ「LGTM（修正不要）」と明記
