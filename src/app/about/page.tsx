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
      <main style={{ paddingTop: '70px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          padding: '60px var(--px)',
          maxWidth: '720px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>

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
            작업문의는 메일로 부탁드립니다.<br />
            下のメールでご連絡ください。<br />
            所属スタジオとスケジュール、作品名、単価を明記してご相談くださいませ。
          </p>
          <p style={{ fontSize: '14px', color: 'var(--gray-600)', fontWeight: 400, lineHeight: 1.7, marginBottom: '40px', letterSpacing: 'var(--tracking)' }}>
            + 현재 작업은 받지 않습니다.<br />
            (拘束中です、しばらく仕事受け付けません。ご了承ください)
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
            작품제목, 작업파트 클릭시 해당 작업물로 이동합니다.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
