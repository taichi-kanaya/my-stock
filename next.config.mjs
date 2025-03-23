/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // 末尾のスラッシュを削除する
  trailingSlash: false,
  // 外部URLから画像を埋め込み可能にする
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icons8.com',
        pathname: '/**',
      },
    ],
  },

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
