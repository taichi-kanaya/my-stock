# my-stock

## 概要

簡易的な記事管理アプリケーション

## 技術スタック

- Next.js v14（App Routerを使用）
- TypeScript v5
- Tailwind CSS v3
- Storybook v8
- NextAuth.js（Google OAuthでの認証）v4
- Contentful（GraphQLでのコンテンツ管理）

---

## 開発環境構築

### 【環境変数】

下記環境変数の設定が必要です。

| 環境変数名                 | 説明                                             |
| -------------------------- | ------------------------------------------------ |
| CONTENTFUL_SPACE_ID        | Contentful の Space ID                           |
| CONTENTFUL_ENVIRONMENT_ID  | Contentful の Environment ID                     |
| CONTENTFUL_CONTENT_TYPE_ID | Contentful の Content Type ID                    |
| CDA_ACCESS_TOKEN           | Content Delivery API のトークン                  |
| CMA_ACCESS_TOKEN           | Content Management API のトークン                |
| GOOGLE_CLIENT_ID           | Google OAuth で使用するクライアント ID           |
| GOOGLE_CLIENT_SECRET       | Google OAuth で使用するクライアントシークレット  |
| NEXTAUTH_SECRET            | NextAuth.js がセッションを暗号化するための秘密鍵 |
| NEXTAUTH_URL               | 認証時に使用するURL                              |

### 【ローカルでのアプリケーション起動】

```bash
# 1.Node.jsのバージョンを切り替え
nvm use

# 2.パッケージのインストール
npm install

# 3.アプリケーション起動（http://localhost:3000/）
## 開発モード
npm run dev

## 本番モード
npm run build && npm run start
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
