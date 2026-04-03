'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '../data/work-content'

interface Props { 
  project: Project
  children: React.ReactNode 
}

export default function WorkDetailClient({ project, children }: Props) {
  const router = useRouter()
  const [toastVisible, setToastVisible] = useState(false)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  // 모달 띄우기 로직 (그대로 유지!)
  useEffect(() => {
    const contentArea = document.getElementById('mdx-content-area')
    if (!contentArea) return

    const images = contentArea.querySelectorAll('img')

    const handleImageClick = (e: Event) => {
      const target = e.target as HTMLImageElement
      setLightboxImg(target.src)
      document.body.style.overflow = 'hidden'
    }

    images.forEach(img => {
      img.style.cursor = 'zoom-in'
      img.addEventListener('click', handleImageClick)
    })

    return () => {
      images.forEach(img => {
        img.removeEventListener('click', handleImageClick)
      })
      document.body.style.overflow = 'auto'
    }
  }, [children])

  const handleShare = async () => {
    try { await navigator.clipboard.writeText(window.location.href) } catch { }
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  const closeLightbox = () => {
    setLightboxImg(null)
    document.body.style.overflow = 'auto'
  }

  // ✨ 복구된 디테일(스펙) 정보!
  const specs = [
    { label: 'CLIENT', value: project.client || '-' },
    { label: 'CATEGORY', value: project.category },
    { label: 'DATE', value: project.year },
    { label: 'TYPE', value: project.type || '-' },
  ]

  return (
    <>
      {/* 상단바 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px var(--px) 12px' }}>
        <button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--gray-600)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
          </svg>
          워크 목록으로
        </button>
        <button onClick={handleShare} style={{ color: 'var(--gray-400)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
      </div>

      <div style={{ padding: '32px var(--px) 24px', fontWeight: 800, fontSize: 'clamp(28px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
        {project.title}
      </div>

      {/* 썸네일 영역 */}
      {(project.thumbnail || project.images?.[0]) && (
        <div style={{ margin: '0 var(--px)', aspectRatio: '16/9', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src={project.thumbnail || project.images[0]} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {/* 설명 영역 */}
      {project.excerpt && (
        <div style={{ padding: '32px var(--px) 0', fontSize: '15px', lineHeight: 1.85, color: '#333', maxWidth: '820px' }}>
          {project.excerpt}
        </div>
      )}

      {/* ✨ 스샷으로 보여주신 디테일 영역 다시 추가했습니다! */}
      <div style={{
        padding: '32px var(--px) 32px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '8px 24px', maxWidth: '820px',
      }}>
        {specs.map(({ label, value }) => (
          <div key={label}>
            <div style={{ fontSize: '11px', color: 'var(--gray-400)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px', letterSpacing: 'var(--tracking)' }}>{value}</div>
          </div>
        ))}
      </div>

      <hr style={{ margin: '0 var(--px)', border: 'none', borderTop: '1px solid var(--gray-200)' }} />

      {/* MDX 콘텐츠 */}
      <div id="mdx-content-area" style={{ padding: '40px var(--px)' }}>
        {children}
      </div>

      {/* 알림 토스트 */}
      {toastVisible && (
        <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', background: 'var(--black)', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontSize: '13px', zIndex: 300 }}>
          링크가 복사되었습니다
        </div>
      )}

      {/* 모달 */}
      {lightboxImg && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '40px'
          }}
          onClick={closeLightbox}
        >
          <div style={{ 
            background: '#fff', padding: '10px', borderRadius: '12px', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)', maxWidth: '90vw', maxHeight: '90vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }} onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxImg} alt="원본 뷰" 
              style={{ maxWidth: '100%', maxHeight: 'calc(90vh - 20px)', objectFit: 'contain', borderRadius: '4px' }} 
            />
          </div>
        </div>
      )}
    </>
  )
}