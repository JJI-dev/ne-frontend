'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { projects } from '@/app/project/data/projects-content'

interface Props { open: boolean; onClose: () => void }

export default function SpotlightSearch({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
    else setQuery('')
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const results = query.trim()
    ? projects.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.client || '').toLowerCase().includes(query.toLowerCase())
      )
    : []

  if (!open) return null

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '120px',
      }}
    >
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        width: 'min(600px, 90vw)',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 24px', borderBottom: '1px solid var(--gray-200)' }}>
          <svg width="20" height="20" viewBox="0 0 64 62" fill="none">
            <rect x="35.918" y="30" width="36" height="10.8473" rx="4" transform="rotate(39.6266 35.918 30)" fill="black"/>
            <circle cx="29" cy="29" r="26" fill="white" stroke="black" strokeWidth="6"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="프로젝트 검색..."
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontFamily: 'var(--font-body)', fontSize: '18px',
              letterSpacing: 'var(--tracking)', background: 'transparent',
            }}
          />
          {query && <button onClick={() => setQuery('')} style={{ color: 'var(--gray-400)', fontSize: '20px' }}>×</button>}
        </div>
        <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
          {!query.trim() ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '14px' }}>검색어를 입력하세요</div>
          ) : results.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '14px' }}>검색 결과가 없습니다</div>
          ) : results.map(p => (
            <div
              key={p.id}
              onClick={() => { onClose(); router.push(`/project/${p.id}`) }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 24px', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--gray-100)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <div style={{ width: '48px', height: '36px', background: 'var(--gray-200)', borderRadius: '4px', flexShrink: 0, overflow: 'hidden' }}>
                {p.thumbnail && <img src={p.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{p.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--gray-400)', marginTop: '2px' }}>{p.category} · {p.year} · {p.client || '-'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
