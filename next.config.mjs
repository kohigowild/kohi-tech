const nextConfig = {
  // 여기에 Next.js 구성 옵션을 추가할 수 있습니다.
  async rewrites() {
    return [
      {
        source: '/api/notion', // 프론트엔드에서 API 호출할 경로 정의
        destination: `https://api.notion.com/v1/databases/${process.env.NEXT_PUBLIC_DATABASE_ID}/query`, // 백엔드 서버 URL
      },
    ]
  },
}

export default nextConfig
