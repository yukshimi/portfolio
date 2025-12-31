---
description: 対話型でコンポーネント作成フローを開始するためのルール（Astro/React向け）
globs: ["**/*"]
alwaysApply: false
triggers: ["コンポーネントつくりたい！"]
---

# フローガイドライン

このルールが適用されたら、最初に「コンポーネントつくっちゃうよー！！」と宣言すること。

## 1. 実行前の対話ステップ（重要：一括質問禁止）

以下を **必ず順番にひとつずつ** 質問し、回答を受け取ってから次へ進むこと。

1. **作成場所の確認**: `src/components/astro/` か `src/components/react/` のどちらか（必要ならサブディレクトリも）
2. **役割/名称の確認**: UI上の役割（例: Header, WorkCard, ContactCTA など）
3. **ファイル名の確認**:
   - Astro: `PascalCase.astro`
   - React: `PascalCase.tsx`
   - **[バリデーション]**: `kebab-case` 等で来たら、規約に合わせて修正してよいか確認する
4. **Propsの有無**: 受け取るProps（有り/無し、あるなら項目名と型）

## 2. 実装フェーズ（テンプレートのみ、推測で肉付け禁止）

- HTML/テキスト/デザインは推測で入れない（構造だけ）
- 既存のフォーマット（Prettier）を崩さない

### Astroコンポーネント（Propsあり）

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

### Reactコンポーネント（Propsあり）

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
