# my-stock

## 概要

簡易的な記事管理アプリケーション（Next.js 14 App Router 学習用）

---

## 開発環境構築

### 【環境変数】

下記環境変数の設定が必要です。

| 環境変数名                 | 説明                              |
| -------------------------- | --------------------------------- |
| CONTENTFUL_SPACE_ID        | Contentful の Space ID            |
| CONTENTFUL_ENVIRONMENT_ID  | Contentful の Environment ID      |
| CONTENTFUL_CONTENT_TYPE_ID | Contentful の Content Type ID     |
| CDA_ACCESS_TOKEN           | Content Delivery API のトークン   |
| CMA_ACCESS_TOKEN           | Content Management API のトークン |

### 【ローカルでのアプリケーション起動】

```bash
# 1.Node.jsのバージョンを切り替え
nvm use

# 2.パッケージのインストール
npm install

# 3.アプリケーション起動（http://localhost:3000/）
npm run dev
```

### 【補足事項】

```bash
# 4.ESLintの実行
npm run lint

# 5.Prettierによるフォーマットの実行
npm run format

# 6.StoryBookの起動（http://localhost:6006/）
npm run storybook
```
