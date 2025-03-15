module.exports = {
  env: {
    // ブラウザのグローバル変数（window, document など）を認識
    browser: true,
    // 最新のES2022構文を有効にする
    es2022: true,
    // Node.js環境のグローバル変数（process など）を認識
    node: true,
  },
  extends: [
    // Next.js推奨のESLint設定
    'next/core-web-vitals',
    // TypeScript推奨のESLint設定
    'plugin:@typescript-eslint/recommended',
    // Prettierと競合するルールをESLintで無効化
    'prettier',
  ],
  plugins: [
    // TypeScriptの静的解析用ESLintプラグイン
    '@typescript-eslint',
    // PrettierのフォーマットチェックをESLintに統合
    'prettier',
  ],
  // ESLintがTypeScriptの構文を理解できるようにする
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // 最新のECMAScriptを使用
    ecmaVersion: 'latest',
    // ESModulesを有効化
    sourceType: 'module',
    // TypeScriptのプロジェクト設定をESLintに適用
    project: './tsconfig.json',
  },
  // カスタムルール
  rules: {
    // Prettierのフォーマット違反をエラーにする
    'prettier/prettier': 'error',
    // 関数の戻り値の型を明示するルールを無効化
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // any型の使用を警告
    '@typescript-eslint/no-explicit-any': 'warn',
    // 未使用の変数を警告。ただし _ で始まる変数 (_unused) は除外
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // 型アサーション (as) を乱用しない
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    // console.logを警告
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}
