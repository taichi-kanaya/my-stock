import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import { defineConfig } from 'vitest/config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  plugins: [
    // StoryをテストするためのVitestプラグイン
    storybookTest({
      // Storybookの設定ファイル（.storybookフォルダ）を指定
      configDir: path.join(dirname, '.storybook'),
    }),
  ],
  test: {
    name: 'storybook',
    browser: {
      // ブラウザテストを有効化（通常はUIコンポーネントをテストするために必要）
      enabled: true,
      // ヘッドレスモードで実行（GUIを表示せずに動作）
      headless: true,
      // ブラウザテストをPlaywrightで実行（puppeteerではなくPlaywrightを使う）
      provider: 'playwright',
      // Chromiumベースのブラウザでテストを実行
      instances: [{ browser: 'chromium' }],
    },
    // テストのセットアップファイルを指定
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
})
