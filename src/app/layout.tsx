import type { Metadata } from 'next'
import './globals.css'
import CursorAnimation from '@/components/CursorAnimation'

export const metadata: Metadata = {
  title: 'JJI-NE: Canvas',
  description: 'JJI-NE Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        {/*
          Panchang: cdnfonts CDN이 가끔 500 반환
          → 실패해도 Noto Sans KR fallback으로 렌더되므로 기능 영향 없음
          → 500 에러 콘솔 억제: onError로 조용히 처리
        */}
        <link
          rel="preconnect"
          href="https://fonts.cdnfonts.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Panchang 동적 로드 - 실패해도 콘솔 에러 없이 fallback */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://fonts.cdnfonts.com/css/panchang';
                link.onerror = function() {}; // suppress 500 error
                document.head.appendChild(link);
              })();
            `,
          }}
        />
        <CursorAnimation />
        {children}
      </body>
    </html>
  )
}
