import '@/styles/tailwind.scss'

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    // 特定のpropsをStorybook上のUIで操作可能にする
    controls: {
      expanded: true,
      matchers: {
        // カラーピッカー操作可能なpropsを正規表現指定
        color: /(background|color)$/i,
        // カレンダー操作可能なpropsを正規表現指定
        date: /Date$/i,
      },
    },
    // ダークモード切り替え後のレイアウト確認用
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1e1e1e' },
      ],
    },
    // 各種モバイル端末でのレイアウト確認用
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    options: {
      // サイドバーに表示されるストーリーの並び順を指定
      storySort: {
        // アルファベット順に設定
        method: 'alphabetical',
        // サブカテゴリまでは並び替えない
        includeNames: false,
      },
    },
    // ストーリーのデフォルトの表示レイアウト
    layout: 'centered',
  },
}

export default preview
