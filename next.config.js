/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // トップページは記事一覧ページにリダイレクト
        source: "/",
        destination: "/stocks",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
