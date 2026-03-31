'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function AboutPage() {
  const [imgSrc, setImgSrc] = useState('/about-character.png')
  const [imgFailed, setImgFailed] = useState(false)

  const handleError = () => {
    if (imgSrc === '/about-character.png') {
      // .png 실패 → .jpg 시도
      setImgSrc('/about-character.jpg')
    } else {
      // 둘 다 실패 → placeholder
      setImgFailed(true)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ paddingTop: '80px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className="reveal visible"
          style={{
            padding: '60px var(--px)',
            maxWidth: '720px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >

          {/* Character image */}
          <div style={{
            width: '100%',
            maxWidth: '540px',
            marginBottom: '40px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {imgFailed ? (
              <div style={{
                width: '100%', aspectRatio: '4/3',
                background: 'var(--gray-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gray-400)', fontSize: '14px',
              }}>
                Character Image
              </div>
            ) : (
              <img
                key={imgSrc}
                src={imgSrc}
                alt="JJI-NE character"
                style={{ width: '100%', display: 'block' }}
                onError={handleError}
              />
            )}
          </div>

          <div style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px', letterSpacing: 'var(--tracking)' }}>
            JJI-NE
          </div>
          <div style={{ fontSize: '16px', color: 'var(--gray-600)', marginBottom: '32px', fontWeight: 300, letterSpacing: 'var(--tracking)' }}>
            Creator
          </div>

          <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#333', fontWeight: 400, marginBottom: '12px', letterSpacing: 'var(--tracking)' }}>
            관심 가져주셔서 감사합니다. 원활한 작업을 위해 당분간 신규 의뢰는 정중히 사양하고 있습니다. <br/>
            작업이 가능해지면 다시 공지하겠습니다. 문의 시에는 구체적인 작업 조건(소속, 기간, 예산 등)을 꼭 포함해 주세요.<br />
           
          </p>
          <p style={{ fontSize: '14px', color: 'var(--gray-600)', fontWeight: 400, lineHeight: 1.7, marginBottom: '40px', letterSpacing: 'var(--tracking)' }}>
            お声がけいただきありがとうございます。あいにく現在拘束中のため, しばらくの間は新規のお引き受けが難しい状況です。<br/>
             受付再開までお待ちいただけますと幸いです。お問い合わせの際は、スケジュールや単가等の詳細を併せてご連絡ください。
          </p>

          <a
            href="mailto:ne@jji.kr"
            style={{ display: 'inline-flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}
          >
            <span style={{ fontSize: '15px', color: 'var(--gray-400)', fontWeight: 400, letterSpacing: 'var(--tracking)' }}>
              E-mail
            </span>
            <span style={{
              fontSize: '22px', fontWeight: 600, color: 'var(--black)',
              borderBottom: '2px solid var(--black)', lineHeight: 1,
              letterSpacing: 'var(--tracking)',
            }}>
              ne@jji.kr
            </span>
          </a>

          <p style={{ fontSize: '13px', color: 'var(--gray-400)', letterSpacing: 'var(--tracking)' }}>
            WORK 페이지에서 작업 확인해주세요!!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
