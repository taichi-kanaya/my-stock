export default {
  // セミコロンなし
  semi: false,
  // シングルクォートを使用
  singleQuote: true,
  // 末尾のカンマを付ける
  trailingComma: 'all',
  // 1行の長さ
  printWidth: 100,
  // インデントはスペース2つ
  tabWidth: 2,
  // スペースを使用（タブではなくスペース）
  useTabs: false,
  // 常に () を付ける（x => x + 1 → (x) => x + 1）
  arrowParens: 'always',
  // オブジェクトの {} 内にスペースを入れる ({ foo: "bar" })
  bracketSpacing: true,
  // LF（Unix形式）を使用
  endOfLine: 'lf',
  // JSXではダブルクォートを使用 (<div className="test">)
  jsxSingleQuote: false,
  // Markdownの改行を変更しない
  proseWrap: 'preserve',
  // Tailwind CSSのクラス並び替え
  plugins: ['prettier-plugin-tailwindcss'],
}
