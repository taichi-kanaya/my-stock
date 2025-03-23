import prettierPluginSortImports from '@ianvs/prettier-plugin-sort-imports'

/** @type {import("prettier").Config} */
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
  plugins: ['prettier-plugin-tailwindcss', prettierPluginSortImports],
  // import順の制御
  importOrder: [
    '^react$', // React系（最優先）
    '', // 空行を入れる
    '<THIRD_PARTY_MODULES>', // 外部ライブラリ（npmパッケージ）
    '', // 空行を入れる
    '^@/.*', // エイリアス（@/client/componentsなど）
    '', // 空行を入れる
    '^[./]', // 相対パス（./や../）
  ],
}
