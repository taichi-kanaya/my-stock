import type { StorybookConfig } from '@storybook/experimental-nextjs-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  // Storybookが読み込むストーリーファイルを設定
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // 初回セットアップとチュートリアル提供
    '@storybook/addon-onboarding',
    // 基本的な Storybook 機能を統合したパック
    '@storybook/addon-essentials',
    // ビジュアルテストと UI の変更検知
    '@chromatic-com/storybook',
    // Storybook 上でのテスト実行
    '@storybook/experimental-addon-test',
  ],
  // ビルドツールとの統合方法を設定
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  // Viteでパスエイリアスを解決できるように設定
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': 'src',
        },
      },
    })
  },
}
export default config
