'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ── 아이콘 ── */
const LogoSVG = () => (
  <svg style={{ height: 'var(--logo-h, 20px)', width: 'auto', display: 'block' }} viewBox="0 0 107 67" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.0831 37.8998C27.3803 38.1933 26.2398 38.1938 21.8673 37.3204C19.2958 36.8067 14.8826 36.0369 12.2049 35.4698C7.49817 34.4731 6.55574 33.4429 5.5403 32.4422C4.6659 31.5804 3.87078 28.8889 3.23539 26.5626C2.83302 25.0895 3.00242 23.67 3.319 21.9061C3.55532 20.5894 4.18176 18.4554 4.67927 16.9116C5.47065 14.4557 6.25665 13.2037 6.83065 12.3718C7.51516 11.3798 8.95755 9.96557 11.4351 8.0389C12.8493 6.93917 14.8725 5.91338 16.3891 5.16269C18.8643 3.93758 20.5833 3.54078 22.2373 3.28163C24.7552 2.88714 27.0833 2.97955 28.6307 3.12426C30.1962 3.27066 31.8955 3.86453 33.7203 4.43638C37.1424 5.50884 39.2811 6.67545 40.3723 7.45089C41.7436 8.42541 42.9618 11.3104 43.9898 13.8119C44.4587 14.9531 44.4694 16.1015 44.4802 17.9809C44.5013 21.6777 44.3366 24.3178 44.2596 24.8655C44.2044 25.4133 44.1164 25.9457 43.9845 26.4058C43.9181 26.6135 43.8526 26.7688 43.3224 27.104" stroke="black" strokeWidth="4" strokeLinecap="round"/>
    <path d="M43.668 26.7708C43.9658 26.5895 44.9639 26.0197 46.5745 25.703C47.5547 25.5103 48.9238 25.8896 50.4488 26.6447C51.0292 26.937 51.4928 27.1998 51.8724 27.4411C52.0537 27.5429 52.2123 27.6027 52.6152 27.8456" stroke="black" strokeWidth="4" strokeLinecap="round"/>
    <path d="M53.0848 28.1695C53.0848 28.1311 52.9749 27.5945 52.8084 26.1449C52.5494 23.8896 52.9241 21.5002 53.2661 19.6831C53.5318 18.2714 53.9174 17.3119 54.5066 16.1679C56.4838 12.3287 58.1073 10.7965 59.1517 9.66114C60.2062 8.5147 61.4653 7.46196 62.6095 6.72232C63.8913 5.89369 65.9866 5.71168 70.2299 5.82055C72.3468 5.87485 73.951 6.35634 76.4314 6.97007C78.4919 7.47992 80.1652 8.40921 81.5846 9.04396C82.9157 9.63919 83.9237 10.2144 84.7813 10.7532C86.05 11.5504 87.9628 12.9596 88.8866 13.6514C90.1374 14.588 90.8847 15.7037 92.0694 17.277C92.8512 18.3153 93.4312 19.3509 94.1459 20.6089C95.0685 22.2329 95.2782 23.1168 95.4656 24.1507C95.889 26.4867 95.2553 27.5117 95.0665 28.3299C94.8958 29.0697 94.4136 29.8549 93.7919 30.6624C93.0568 31.6175 91.6691 32.4653 88.9912 33.8322C86.0546 35.3313 84.9558 35.433 82.6968 35.6493C81.9148 35.7113 81.0066 35.7961 80.0308 35.8588C79.0551 35.9215 78.0392 35.9595 76.9925 35.9405" stroke="black" strokeWidth="4" strokeLinecap="round"/>
    <path d="M72.7373 48.3953C73.7384 48.9424 75.8053 49.5858 82.8808 49.4249C86.7021 49.338 89.4998 47.5337 91.2424 46.1901C91.9985 45.607 92.614 44.8704 93.4372 44.3625C94.7243 43.5685 96.5807 44.3509 101.218 45.9323C102.178 46.2449 102.455 46.313 102.764 46.4274C103.073 46.5419 103.405 46.7007 103.999 47.2767" stroke="black" strokeWidth="4" strokeLinecap="round"/>
    <path d="M28.3586 37.3556C28.2723 37.4579 27.9402 37.8429 27.2383 38.6404C26.3039 39.7021 25.421 40.7647 24.7161 41.9108C23.7873 43.4207 23.2421 45.2513 22.8936 47.0156C22.5442 48.7848 22.7018 50.0213 22.816 50.7799C22.9817 51.8799 23.5037 53.2958 24.2198 54.8223C24.9301 56.3364 26.3875 57.7118 27.8648 59.0268C29.0468 60.0789 29.9431 60.494 30.4227 60.7514C31.0434 61.0845 32.3074 61.5379 33.8716 62.0538C34.9877 62.422 36.1894 62.5857 37.4949 62.7855C39.2581 63.0555 41.2406 63.1918 42.8659 63.3737C45.183 63.6329 46.4332 63.7992 48.001 63.8906C50.2619 64.0224 51.9172 64.007 52.211 63.9874C53.3073 63.9144 55.1749 63.6683 57.3999 63.31C58.5827 63.1195 60.226 62.7042 61.4798 62.3567C62.2334 62.1478 62.7809 61.8936 63.5348 61.3983C64.19 60.9677 65.1065 60.2129 65.856 59.5192C66.6278 58.8049 67.1061 58.1759 67.6381 57.5552C68.6485 56.3764 68.9177 55.8772 69.5209 55.0043C70.0403 54.2527 70.2551 53.8281 70.4567 53.3905C70.7159 52.8277 70.9018 52.275 71.2967 50.5963C71.4962 49.7484 71.4489 48.1987 71.4776 46.211C71.508 44.1033 71.5925 43.3229 71.6858 42.7267C71.7643 42.2253 71.808 41.6508 71.9085 41.0693C72.0199 40.4242 72.0667 39.8229 72.0885 39.2224C72.1098 38.9614 72.1245 38.2988 72.1316 37.4183C72.1387 37.0806 72.153 36.9643 72.1676 36.5703" stroke="black" strokeWidth="4" strokeLinecap="round"/>
    <path d="M72.6021 36.5859C72.7468 36.5859 72.8937 36.5793 73.4883 36.5036C74.9802 36.303 76.1168 36.1544 76.3614 36.1312C76.4684 36.1212 76.5408 36.1146 76.7908 36.0879" stroke="black" strokeWidth="4" strokeLinecap="round"/>
  </svg>
)

const HamburgerIcon = () => (
  <svg style={{ height: 'var(--ham-h, 20px)', width: 'auto', display: 'block' }} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="1" y1="2"  x2="21" y2="2"  stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="1" y1="10" x2="21" y2="10" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="1" y1="18" x2="21" y2="18" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const CloseIcon = () => (
  <svg style={{ height: 'var(--ham-h, 20px)', width: 'auto', display: 'block' }} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2" y1="2"  x2="20" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="2" y1="18" x2="20" y2="2"  stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const FONT_SIZE = 'clamp(26px, 3.8vw, 46px)'

/*
  NavLink 핵심 구조:
  - <a> 태그를 display:block 으로 → 패널 전체 너비 차지
  - 언더라인은 <a> 바깥 별도 <div>로 분리 → 텍스트 길이 무관하게 항상 full-width
  - 호버 시에만 색상 + 언더라인 표시 (active 상태 없음)
*/
function NavLink({ label, href, onClick }: {
  label: string
  href: string
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const lines = label.split('\n')

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 링크 텍스트 */}
      <Link
        href={href}
        onClick={onClick}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: hovered ? '#ffffff' : '#444444',
          transition: 'color 0.2s ease',
        }}
      >
        {lines.map((line, i) => (
          // 각 줄을 relative 컨테이너로 감싸서 줄마다 언더라인
          <span key={i} style={{
            display: 'block',
            position: 'relative',
            paddingBottom: '6px',
            marginBottom: i < lines.length - 1 ? '2px' : '0',
          }}>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: FONT_SIZE,
              letterSpacing: '0.02em',
              lineHeight: 1.15,
            }}>
              {line}
            </span>
            {/* 각 줄 아래 언더라인 */}
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: '#ffffff',
              display: 'block',
              transformOrigin: 'left center',
              transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
              transition: `transform 0.28s ease ${i * 0.06}s`, // 순서대로 약간 딜레이
            }} />
          </span>
        ))}
      </Link>
    </div>
  )
}

const navLinks = [
  { label: 'WORK', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'PROJECT\nREQUEST', href: '/contact' },
  { label: 'CONTACT', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── 헤더 바 ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 28px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <Link href="/" aria-label="Home" className="nav-logo-inner">
          <LogoSVG />
        </Link>
        {!open && (
          <button onClick={() => setOpen(true)} aria-label="메뉴 열기"
            style={{ padding: '10px 6px', display: 'flex', alignItems: 'center' }}>
            <HamburgerIcon />
          </button>
        )}
      </header>

      {/*
        X 버튼 — 완전 독립 fixed
        cursor: none 글로벌인데 이 버튼 위에서는 흰색 커서링으로 보여야 하므로
        CursorAnimation이 nav panel 감지해서 처리
      */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          aria-label="메뉴 닫기" data-cursor-dark="true"
          style={{
            position: 'fixed',
            top: '20px',
            right: '28px',
            zIndex: 201,
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
          }}
        >
          <CloseIcon />
        </button>
      )}

      {/* 백드롭 */}
      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 148 }} />
      )}

      {/* ── Nav 패널 ── */}
      <nav
        id="nav-overlay-panel"
        style={{
          position: 'fixed', top: 0, right: 0,
          width: 'min(520px, 92vw)', height: '100vh',
          background: '#0a0a0a',
          zIndex: 150,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '80px 64px',
          transform: open ? 'translateX(0)' : 'translateX(110%)',
          transition: 'transform 0.45s cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {navLinks.map(({ label, href }) => (
            <NavLink key={label} label={label} href={href} onClick={() => setOpen(false)} />
          ))}
        </div>

        {/* 소셜 */}
        <div style={{ marginTop: '64px', display: 'flex', gap: '24px' }}>
          {[
            { href: 'https://twitter.com', label: 'Twitter', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z' },
            { href: 'https://instagram.com', label: 'Instagram', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
          ].map(({ href, label, d }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: '#555', transition: 'color 0.2s', display: 'flex' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#555'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={d}/></svg>
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
