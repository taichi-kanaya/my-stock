/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // 末尾のスラッシュを削除する
  trailingSlash: false,

  async redirects() {
    return [
      {
        // トップページは記事一覧ページにリダイレクト
        source: '/',
        destination: '/articles',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
