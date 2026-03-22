'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ── 아이콘 ── */
const LogoSVG = () => (
  <svg width="48" height="34" viewBox="0 0 97 67" fill="none">
    <path d="M25.5352 37.8998C24.9038 38.1933 23.8792 38.1938 19.9509 37.3204C17.6407 36.8067 13.6758 36.0369 11.2702 35.4698C7.04162 34.4731 6.19494 33.4429 5.28266 32.4422C4.49709 31.5804 3.78275 28.8889 3.21192 26.5626C2.85042 25.0895 3.00262 23.67 3.28703 21.9061C3.49935 20.5894 4.06214 18.4554 4.5091 16.9116C5.22009 14.4557 5.92623 13.2037 6.44192 12.3718C7.05688 11.3798 8.35273 9.96557 10.5786 8.0389C11.8491 6.93917 13.6667 5.91338 15.0293 5.16269C17.253 3.93758 18.7973 3.54078 20.2833 3.28163C22.5454 2.88714 24.637 2.97955 26.0272 3.12426C27.4336 3.27066 28.9603 3.86453 30.5997 4.43638C33.6742 5.50884 35.5956 6.67545 36.5759 7.45089C37.8079 8.42541 38.9023 11.3104 39.8259 13.8119C40.2472 14.9531 40.2568 16.1015 40.2664 17.9809C40.2854 21.6777 40.1375 24.3178 40.0683 24.8655C40.0187 25.4133 39.9397 25.9457 39.8212 26.4058C39.7615 26.6135 39.7027 26.7688 39.2263 27.104" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    <path d="M39.5371 26.7699C39.8047 26.5885 40.7014 26.0187 42.1484 25.702C43.029 25.5093 44.259 25.8886 45.6291 26.6437C46.1505 26.9361 46.567 27.1988 46.908 27.4402C47.0709 27.5419 47.2134 27.6017 47.5753 27.8446" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    <path d="M47.9967 28.1705C47.9967 28.132 47.898 27.5955 47.7484 26.1459C47.5157 23.8905 47.8523 21.5011 48.1596 19.6841C48.3983 18.2724 48.7447 17.3128 49.274 16.1688C51.0504 12.3297 52.5089 10.7975 53.4472 9.66211C54.3946 8.51568 55.5258 7.46293 56.5537 6.7233C57.7053 5.89467 59.5877 5.71266 63.3999 5.82152C65.3018 5.87583 66.743 6.35731 68.9714 6.97104C70.8225 7.4809 72.3258 8.41018 73.6011 9.04494C74.797 9.64017 75.7025 10.2154 76.473 10.7542C77.6128 11.5514 79.3312 12.9606 80.1612 13.6524C81.2849 14.589 81.9563 15.7047 83.0206 17.278C83.723 18.3163 84.2441 19.3519 84.8862 20.6099C85.7151 22.2338 85.9035 23.1178 86.0718 24.1517C86.4522 26.4876 85.8829 27.5127 85.7133 28.3309C85.5599 29.0707 85.1267 29.8559 84.5682 30.6634C83.9077 31.6184 82.661 32.4663 80.2552 33.8332C77.6169 35.3322 76.6298 35.4339 74.6003 35.6503C73.8977 35.7123 73.0818 35.7971 72.2052 35.8598C71.3285 35.9225 70.4158 35.9605 69.4755 35.9414" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    <path d="M65.6533 48.3953C66.5527 48.9424 68.4096 49.5858 74.7663 49.4249C78.1994 49.338 80.7129 47.5337 82.2784 46.1901C82.9577 45.607 83.5106 44.8704 84.2502 44.3625C85.4065 43.5685 87.0744 44.3509 91.2405 45.9323C92.1034 46.2449 92.3522 46.313 92.6297 46.4274C92.9071 46.5419 93.2057 46.7007 93.7394 47.2767" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    <path d="M25.7826 37.3556C25.7051 37.4579 25.4067 37.8429 24.7761 38.6404C23.9367 39.7021 23.1435 40.7647 22.5101 41.9108C21.6757 43.4207 21.186 45.2513 20.8729 47.0156C20.5589 48.7848 20.7005 50.0213 20.8031 50.7799C20.952 51.8799 21.4209 53.2958 22.0643 54.8223C22.7024 56.3364 24.0118 57.7118 25.339 59.0268C26.4009 60.0789 27.2062 60.494 27.6371 60.7514C28.1946 61.0845 29.3303 61.5379 30.7355 62.0538C31.7383 62.422 32.8179 62.5857 33.9907 62.7855C35.5748 63.0555 37.3559 63.1918 38.8161 63.3737C40.8977 63.6329 42.0209 63.7992 43.4294 63.8906C45.4607 64.0224 46.9478 64.007 47.2118 63.9874C48.1967 63.9144 49.8745 63.6683 51.8735 63.31C52.9362 63.1195 54.4125 62.7042 55.5389 62.3567C56.216 62.1478 56.7078 61.8936 57.3851 61.3983C57.9737 60.9677 58.7971 60.2129 59.4705 59.5192C60.1639 58.8049 60.5936 58.1759 61.0715 57.5552C61.9793 56.3764 62.2212 55.8772 62.763 55.0043C63.2297 54.2527 63.4227 53.8281 63.6037 53.3905C63.8366 52.8277 64.0037 52.275 64.3585 50.5963C64.5377 49.7484 64.4952 48.1987 64.5209 46.211C64.5483 44.1033 64.6242 43.3229 64.708 42.7267C64.7786 42.2253 64.8178 41.6508 64.9081 41.0693C65.0082 40.4242 65.0502 39.8229 65.0698 39.2224C65.089 38.9614 65.1021 38.2988 65.1085 37.4183C65.1149 37.0806 65.1277 36.9643 65.1409 36.5703" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    <path d="M65.5312 36.5859C65.6613 36.5859 65.7933 36.5793 66.3274 36.5036C67.6678 36.303 68.689 36.1544 68.9086 36.1312C69.0048 36.1212 69.0698 36.1146 69.2944 36.0879" stroke="black" strokeWidth="6" strokeLinecap="round"/>
  </svg>
)

const HamburgerIcon = () => (
  <svg width="32" height="18" viewBox="0 0 64 36" fill="none">
    <rect width="64" height="9" rx="4.5" fill="black"/>
    <rect y="14" width="54" height="8" rx="4" fill="black"/>
    <rect y="27" width="64" height="9" rx="4.5" fill="black"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="29" height="22" viewBox="0 0 58 45" fill="none">
    <rect x="5.16211" y="0.0917969" width="64" height="9" rx="4.5"
      transform="rotate(35 5.16211 0.0917969)" fill="white"/>
    <rect x="0.0576172" y="36.709" width="64" height="9" rx="4.5"
      transform="rotate(-35 0.0576172 36.709)" fill="white"/>
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
        padding: '18px var(--px)',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <LogoSVG />
        </Link>
        {!open && (
          <button onClick={() => setOpen(true)} aria-label="메뉴 열기"
            style={{ padding: '4px', display: 'flex', alignItems: 'center' }}>
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
            top: '18px',
            right: 'var(--px)',
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
