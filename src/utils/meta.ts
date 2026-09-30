const META_DESCRIPTION_MAX_LENGTH = 160;

/**
 * HTMLを含むテキストから meta description 用の文字列を作る
 */
export function toMetaDescription(text: string): string {
  return text
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, META_DESCRIPTION_MAX_LENGTH);
}
