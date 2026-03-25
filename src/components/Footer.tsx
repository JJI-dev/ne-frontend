'use client'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--white)' }}>
      {/* 상단 콘텐츠 */}
      <div style={{
        padding: '48px var(--px) 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '32px 24px',
        borderTop: '1px solid var(--gray-200)',
      }}>
        <div>
          <p style={{ fontSize: '11px', color: 'var(--gray-400)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Contact</p>
          <a href="mailto:hello@ne.jji.kr" style={{ fontSize: '14px', fontWeight: 500, letterSpacing: 'var(--tracking)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            hello@ne.jji.kr
          </a>
        </div>
        <div>
          <p style={{ fontSize: '11px', color: 'var(--gray-400)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Pages</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Works', href: '/' }].map(({ label, href }) => (
              <a key={label} href={href} style={{ fontSize: '14px', letterSpacing: 'var(--tracking)', color: 'var(--gray-600)' }}>{label}</a>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: '11px', color: 'var(--gray-400)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Studio</p>
          <p style={{ fontSize: '14px', letterSpacing: 'var(--tracking)' }}>JJI-NE</p>
          <p style={{ fontSize: '14px', color: 'var(--gray-400)', letterSpacing: 'var(--tracking)', marginTop: '4px' }}>Creative Studio</p>
        </div>
      </div>

      {/* 카피라이트 */}
      <div style={{
        padding: '16px var(--px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid var(--gray-200)', flexWrap: 'wrap', gap: '8px',
      }}>
        <p style={{ fontSize: '12px', color: 'var(--gray-400)', letterSpacing: 'var(--tracking)' }}>© 2026 JJI-NE. All rights reserved.</p>
        <p style={{ fontSize: '12px', color: 'var(--gray-400)', letterSpacing: 'var(--tracking)' }}>ne.jji.kr</p>
      </div>

      {/* 워드마크 — 높이 제한(clamp)과 translateY를 활용해 1/3 크롭 효과 연출 */}
      <div style={{ 
        overflow: 'hidden',  
        display: 'block',
        height: 'clamp(60px, 12vw, 160px)', /* 여기서 높이를 제한해 강제로 자릅니다 */
        marginLeft: 'calc(-1 * var(--px))', 
        marginRight: 'calc(-1 * var(--px))' 
      }}>
        <svg
          viewBox="0 0 1920 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet" /* slice -> meet으로 변경해 비율 왜곡 방지 */
          style={{ 
            display: 'block', 
            width: '100%', 
            height: 'auto', /* 컨테이너 너비에 맞춰 정상적으로 커지게 둠 */
            transform: 'translateY(-15%)' /* 위쪽 1/3을 자르기 위해 위로 당김 */
          }}
        >
          <path d="M88.92 219.659C167.88 219.659 183.42 200.339 183.42 158.339V-0.000564098H268.68V158.759C268.68 241.079 227.1 292.739 91.86 292.739C49.02 292.739 7.86 286.859 -24.06 276.359L-4.74 207.059C23.4 215.459 61.2 219.659 88.92 219.659ZM385.463 219.659C464.423 219.659 479.963 200.339 479.963 158.339V-0.000564098H565.223V158.759C565.223 241.079 523.643 292.739 388.403 292.739C345.563 292.739 304.403 286.859 272.483 276.359L291.803 207.059C319.943 215.459 357.743 219.659 385.463 219.659ZM691.663 286.439H606.403V-0.000564098H691.663V286.439ZM1034.61 351.539H730.112V301.139H1034.61V351.539ZM1158.42 286.439H1073.16V-0.000564098H1170.6L1416.72 193.619V-0.000564098H1501.98V286.439H1406.64L1158.42 89.4594V286.439ZM1929.5 286.439H1547.3V-0.000564098H1929.5V66.7795H1632.56V114.239H1921.52V169.259H1632.56V219.659H1929.5V286.439Z" fill="black"/>
        </svg>
      </div>
    </footer>
  )
}