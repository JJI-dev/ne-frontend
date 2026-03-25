'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('전송되었습니다! ne@jji.kr 으로 직접 연락해주셔도 됩니다.')
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '14px',
    letterSpacing: 'var(--tracking)', border: 'none',
    borderBottom: '1px solid var(--gray-200)', padding: '10px 0',
    outline: 'none', background: 'transparent', color: 'var(--black)', width: '100%',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ paddingTop: '80px', flex: 1 }}>
        <div className="reveal visible" style={{ padding: '60px var(--px)', maxWidth: '600px' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(48px, 8vw, 96px)',
            letterSpacing: '0.02em', lineHeight: 1, marginBottom: '40px',
          }}>
            PROJECT<br />REQUEST
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: '소속 스튜디오', type: 'text', placeholder: '스튜디오명 또는 개인', required: true },
              { label: '작품명', type: 'text', placeholder: '작품명을 입력해주세요', required: true },
              { label: '예산 (단가)', type: 'text', placeholder: '단가 또는 예산 범위' },
              { label: '스케줄', type: 'text', placeholder: '작업 희망 기간' },
              { label: '연락처 (이메일)', type: 'email', placeholder: '회신받으실 이메일 주소', required: true },
            ].map(({ label, type, placeholder, required }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--gray-600)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</label>
                <input type={type} placeholder={placeholder} required={required} style={inputStyle} />
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', color: 'var(--gray-600)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>작업 파트</label>
              <select style={inputStyle}>
                <option value="">선택해주세요</option>
                <option>일러스트레이션</option>
                <option>캐릭터 디자인</option>
                <option>배경 일러스트</option>
                <option>그래픽</option>
                <option>기타</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', color: 'var(--gray-600)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>상세 내용</label>
              <textarea placeholder="작업 내용에 대해 자세히 설명해주세요" style={{ ...inputStyle, resize: 'none', height: '120px' }} />
            </div>
            <button
              type="submit"
              style={{
                background: 'var(--black)', color: '#fff', fontFamily: 'var(--font-body)',
                fontSize: '14px', fontWeight: 600, letterSpacing: 'var(--tracking)',
                padding: '16px 40px', alignSelf: 'flex-start', marginTop: '8px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
            >
              전송하기
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
