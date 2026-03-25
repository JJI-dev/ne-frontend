'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getProject } from '../data/projects-content'

interface Props { projectId: string }

export default function ProjectDetailClient({ projectId }: Props) {
  const router = useRouter()
  const [htmlContent, setHtmlContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [iframeHeight, setIframeHeight] = useState(600)
  const [toastVisible, setToastVisible] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const project = getProject(projectId)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      try {
        // HEAD 먼저 체크해서 404일 때 콘솔 에러 억제
        const head = await fetch(`/content/projects/project-${projectId}.html`, { method: 'HEAD' })
        if (head.ok) {
          const res = await fetch(`/content/projects/project-${projectId}.html`)
          const text = await res.text()
          if (text && !text.includes('__NEXT_DATA__')) setHtmlContent(text)
        }
      } catch { /* no content */ }
      setIsLoading(false)
    }
    load()
  }, [projectId])

  useEffect(() => {
    if (!htmlContent) return
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'resize' && typeof e.data.height === 'number') {
        const h = Math.max(400, Math.min(e.data.height + 40, window.innerHeight * 8))
        setIframeHeight(h)
        // 1회 수신 후 리스너 제거 — 무한 업데이트 방지
        window.removeEventListener('message', handler)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [htmlContent])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe || !htmlContent) return
    const onLoad = () => {
      try {
        const h = iframe.contentDocument?.documentElement?.scrollHeight
        if (h && h > 0) setIframeHeight(h)
      } catch { /* cross-origin */ }
    }
    iframe.addEventListener('load', onLoad)
    return () => iframe.removeEventListener('load', onLoad)
  }, [htmlContent])

  const handleShare = async () => {
    try { await navigator.clipboard.writeText(window.location.href) } catch { /* noop */ }
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  if (!project) return (
    <div style={{ padding: '120px var(--px)', textAlign: 'center', color: 'var(--gray-400)' }}>
      프로젝트를 찾을 수 없습니다.
    </div>
  )

  const specs = [
    { label: 'CLIENT', value: project.client || '-' },
    { label: 'CATEGORY', value: project.category },
    { label: 'DATE', value: project.year },
    { label: 'TYPE', value: project.type || '-' },
  ]

  // Inject: overflow hidden on html+body, load 1회만 height 측정
  const injectedHtml = htmlContent
    ? htmlContent.replace(
        /<head>/i,
        `<head><style>html,body{overflow:hidden;margin:0;padding:0;}</style>`
      ).replace(
        '</body>',
        `<script>
          window.addEventListener('load',function(){
            var h=document.documentElement.scrollHeight;
            window.parent.postMessage({type:'resize',height:h},'*');
          });
        </script></body>`
      )
    : ''

  return (
    <>
      {/* Top bar: back + share */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px var(--px) 12px',
        borderBottom: '1px solid var(--gray-200)',
      }}>
        <button
          onClick={() => router.back()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '13px', color: 'var(--gray-600)',
            letterSpacing: 'var(--tracking)', transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--black)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--gray-600)'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
          </svg>
          워크 목록으로
        </button>
        <button
          onClick={handleShare}
          title="링크 복사"
          style={{ color: 'var(--gray-400)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--black)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--gray-400)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
      </div>

      {/* Title — Pretendard ExtraBold */}
      <div style={{
        padding: '32px var(--px) 24px',
        fontFamily: 'var(--font-body)',
        fontWeight: 800,
        fontSize: 'clamp(28px, 4.5vw, 56px)',
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
      }}>
        {project.title}
      </div>

      {/* Thumbnail */}
      <div style={{
        margin: '0 var(--px)', aspectRatio: '16/9',
        background: 'var(--gray-100)', border: '1px solid var(--gray-200)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        {project.thumbnail
          ? <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: '14px', color: 'var(--gray-400)' }}>{project.title}</span>
        }
      </div>

      {/* Description */}
      <div style={{ padding: '32px var(--px)', fontSize: '15px', lineHeight: 1.85, color: '#333', maxWidth: '820px', letterSpacing: 'var(--tracking)' }}>
        {project.excerpt}
      </div>

      {/* Specs */}
      <div style={{
        padding: '0 var(--px) 32px',
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

      {/* HTML Content — no scrollbar (overflow hidden injected) */}
      <div style={{ padding: '40px var(--px) 40px' }}>
        {isLoading ? (
          <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>콘텐츠를 불러오는 중...</p>
        ) : injectedHtml ? (
          <div style={{ position: 'relative' }}>
            {/* 투명 overlay — iframe 커서 애니메이션 유지 */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              cursor: 'none',
            }} />
            <iframe
              ref={iframeRef}
              srcDoc={injectedHtml}
              style={{
                width: '100%',
                height: iframeHeight,
                border: 'none',
                display: 'block',
                overflow: 'hidden',
                pointerEvents: 'none',
              }}
              scrolling="no"
              sandbox="allow-scripts"
              title="project-content"
            />
          </div>
        ) : (
          <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>
            HTML 콘텐츠:{' '}
            <code style={{ background: 'var(--gray-100)', padding: '2px 6px', borderRadius: '3px', fontSize: '12px' }}>
              public/content/projects/project-{projectId}.html
            </code>
          </p>
        )}
      </div>

      {/* Share toast */}
      {toastVisible && (
        <div style={{
          position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--black)', color: '#fff',
          padding: '12px 24px', borderRadius: '8px',
          fontSize: '13px', letterSpacing: 'var(--tracking)',
          zIndex: 300, pointerEvents: 'none',
        }}>
          링크가 복사되었습니다
        </div>
      )}
    </>
  )
}
