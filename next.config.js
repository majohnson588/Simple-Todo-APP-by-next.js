/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // 启用 app 目录
    // 如果你仍然需要 Google Font，可以在这里配置新的方式
    // fontLoaders: [
    //   {
    //     loader: '@next/font/google',
    //     options: { subsets: ['latin'] },
    //   },
    // ],
  },
}

module.exports = nextConfig
