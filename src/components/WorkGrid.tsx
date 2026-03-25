'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { projects } from '@/app/project/data/projects-content'
import SpotlightSearch from './SpotlightSearch'

const FILTERS = ['ALL', 'ILLUSTRATION', 'GRAPHICS', 'VIDEO', 'DESIGN', '.'] as const
type Filter = typeof FILTERS[number]

export default function WorkGrid() {
  const [activeFilter, setActiveFilter] = useState<Filter>('ALL')
  const [searchOpen,   setSearchOpen]   = useState(false)
  const [renderKey,    setRenderKey]    = useState(0)  // 필터 변경 시 grid re-mount → reveal 재적용
  const navRef  = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver reveal — grid re-mount 시 재실행
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      }),
      { threshold: 0.08 }
    )
    const targets = el.querySelectorAll('.reveal')
    targets.forEach(t => { t.classList.remove('visible'); obs.observe(t) })
    return () => obs.disconnect()
  }, [renderKey])  // renderKey 바뀔 때마다 재실행

  // nav reveal (1회)
  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      }),
      { threshold: 0, rootMargin: '0px 0px -1px 0px' }
    )
    el.querySelectorAll('.reveal').forEach(t => obs.observe(t))
    return () => obs.disconnect()
  }, [])

  const handleFilter = useCallback((f: Filter) => {
    setActiveFilter(f)
    setRenderKey(k => k + 1)  // grid re-mount 트리거
  }, [])

  // '.' 카테고리는 별도 처리 — 해당 게시물 없음
  const filtered = activeFilter === '.'
    ? []  // 점 카테고리 = 항상 빈 목록
    : activeFilter === 'ALL'
      ? projects
      : projects.filter(p =>
          p.tags.some(t => t.toUpperCase().includes(activeFilter)) ||
          p.category.toUpperCase() === activeFilter
        )

  return (
    <>
      {/* Category nav */}
      <div ref={navRef} style={{ padding: '56px var(--px) 0', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {FILTERS.map((f, i) => (
            <span
              key={f}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
              onClick={() => handleFilter(f)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: f === '.' ? 'clamp(20px, 3.5vw, 32px)' : 'clamp(28px, 6vw, 80px)',
                letterSpacing: '0.01em',
                lineHeight: f === '.' ? 1.4 : 1,
                color: activeFilter === f ? 'var(--black)' : 'var(--gray-400)',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s, opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
                display: 'block',
              }}
              onMouseEnter={e => { if (activeFilter !== f) (e.currentTarget as HTMLElement).style.color = '#888' }}
              onMouseLeave={e => { if (activeFilter !== f) (e.currentTarget as HTMLElement).style.color = 'var(--gray-400)' }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Search row */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '32px var(--px) 0' }}>
        <button
          onClick={() => setSearchOpen(true)}
          aria-label="검색"
          style={{ padding: '4px', display: 'flex', alignItems: 'center' }}
        >
          <svg width="30" height="30" viewBox="0 0 64 62" fill="none">
            <rect x="35.918" y="30" width="36" height="10.8473" rx="4" transform="rotate(39.6266 35.918 30)" fill="black"/>
            <circle cx="29" cy="29" r="26" fill="white" stroke="black" strokeWidth="6"/>
          </svg>
        </button>
      </div>

      <div style={{ height: '32px' }} />

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{
          padding: 'var(--px)', minHeight: '360px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--gray-400)', fontSize: '14px', letterSpacing: 'var(--tracking)',
        }}>
          {activeFilter === '.' ? '해당 카테고리의 작업물이 없습니다' : '해당 카테고리의 작업물이 없습니다'}
        </div>
      ) : (
        <div
          key={renderKey}
          ref={gridRef}
          className="work-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '0 var(--px)' }}
        >
          {filtered.map((p, idx) => (
            p.hasTbu ? (
              <div
                key={p.id}
                className={`work-item reveal reveal-delay-${Math.min((idx % 3) + 1, 4)}`}
                style={{ position: 'relative', aspectRatio: '4/5', background: 'var(--gray-100)', cursor: 'not-allowed' }}
              >
                <div className="work-item-inner" style={{ width: '100%', height: '100%', background: 'var(--gray-200)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ background: 'var(--black)', color: '#fff', fontSize: '11px', padding: '6px 12px', letterSpacing: '0.1em', fontWeight: 600 }}>TBU</span>
                </div>
                <div className="work-item-overlay"><MetaOverlay p={p} /></div>
              </div>
            ) : (
              <Link
                key={p.id}
                href={`/project/${p.id}`}
                className={`work-item reveal reveal-delay-${Math.min((idx % 3) + 1, 4)}`}
                style={{ position: 'relative', aspectRatio: '4/5', background: 'var(--gray-100)', display: 'block', textDecoration: 'none' }}
              >
                <div className="work-item-inner" style={{ width: '100%', height: '100%', background: p.thumbnail ? 'transparent' : 'var(--gray-200)' }}>
                  {p.thumbnail && <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                </div>
                <div className="work-item-overlay"><MetaOverlay p={p} /></div>
              </Link>
            )
          ))}
        </div>
      )}

      <SpotlightSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

function MetaOverlay({ p }: { p: typeof projects[0] }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '8px' }}>
      <div style={{ color: '#fff' }}>
        <div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>TITLE : </span>
          <span style={{ fontSize: '12px', fontWeight: 500 }}>{p.title}</span>
        </div>
        <div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>YEAR : </span>
          <span style={{ fontSize: '12px', fontWeight: 500 }}>{p.year}</span>
        </div>
      </div>
      <div style={{ color: '#fff', textAlign: 'right' }}>
        <div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>CATEGORY : </span>
          <span style={{ fontSize: '12px', fontWeight: 500 }}>{p.category}</span>
        </div>
        <div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>CLIENT : </span>
          <span style={{ fontSize: '12px', fontWeight: 500 }}>{p.client || '-'}</span>
        </div>
      </div>
    </div>
  )
}
