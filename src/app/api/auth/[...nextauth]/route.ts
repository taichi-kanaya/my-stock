import NextAuth from 'next-auth'

import { authOptions } from '@/lib/googleAuth'

// NextAuth関連のAPIエンドポイントの定義
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
