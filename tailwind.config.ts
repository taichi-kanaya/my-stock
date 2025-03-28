import type { Config } from 'tailwindcss'

const config: Config = {
  // Tailwind CSSがスタイルを適用する対象のファイルを指定
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [],
}
export default config
