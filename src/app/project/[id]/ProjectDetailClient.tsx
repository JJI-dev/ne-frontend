'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getProject } from '../data/projects-content'

interface Props { projectId: string }

export default function ProjectDetailClient({ projectId }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [htmlContent, setHtmlContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [iframeHeight, setIframeHeight] = useState(600)
  const [toastVisible, setToastVisible] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // ★ 추가됨: 이미지 뷰어(라이트박스) 상태
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  const project = getProject(projectId)

  const derivedBasePath = (() => {
    const envBase = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim().replace(/\/$/, '')
    // Next의 basePath 설정에 따라 usePathname이 basePath를 생략하는 경우가 있어서,
    // iframe srcDoc 보정에는 브라우저의 실제 URL 경로(window.location.pathname)를 우선 사용합니다.
    const rawPath = (typeof window !== 'undefined' ? window.location.pathname : pathname) || ''
    if (!rawPath) return envBase

    // 예: /ne-frontend/project/1 -> basePath는 /ne-frontend
    const marker = `/project/${projectId}`
    const idx = rawPath.indexOf(marker)
    if (idx >= 0) return rawPath.slice(0, idx).replace(/\/$/, '')

    // fallback: 첫 세그먼트가 basePath인 경우
    const m = rawPath.match(/^\/[^/]+/)
    return m?.[0]?.replace(/\/$/, '') ?? envBase
  })()

  const basePath = derivedBasePath || ''

  const rewriteAbsolutePaths = (html: string) => {
    const p = basePath.replace(/\/$/, '')
    // srcDoc 문서에서는 base URI가 달라질 수 있어서, /images/... 같은 절대경로를 basePath 포함 경로로 보정합니다.
    return html
      .replace(/src="\/images\//g, `src="${p}/images/`)
      .replace(/src='\/images\//g, `src='${p}/images/`)
      .replace(/href="\/images\//g, `href="${p}/images/`)
      .replace(/href='\/images\//g, `href='${p}/images/`)
  }

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      try {
        const head = await fetch(`${basePath}/content/projects/project-${projectId}.html`, { method: 'HEAD' })
        if (head.ok) {
          const res = await fetch(`${basePath}/content/projects/project-${projectId}.html`)
          const text = await res.text()
          if (text && !text.includes('__NEXT_DATA__')) setHtmlContent(text)
        }
      } catch { /* no content */ }
      setIsLoading(false)
    }
    load()
  }, [projectId, basePath])

  useEffect(() => {
    if (!htmlContent) return
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'resize' && typeof e.data.height === 'number') {
        const h = Math.max(400, e.data.height + 40) 
        setIframeHeight(h)
      }
      if (e.data?.type === 'mousemove') {
        const rect = iframeRef.current?.getBoundingClientRect()
        if (!rect) return
        const synth = new MouseEvent('mousemove', {
          bubbles: true,
          clientX: rect.left + e.data.x,
          clientY: rect.top  + e.data.y,
        })
        document.dispatchEvent(synth)
      }
      // ★ 추가됨: iframe 안에서 이미지를 클릭했다는 신호를 받으면 해당 이미지 URL을 저장합니다!
      if (e.data?.type === 'openImage' && e.data.src) {
        setLightboxImg(e.data.src)
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

  // ★ 변경됨: HTML 안의 모든 <img> 태그에 클릭 이벤트를 자동으로 주입하는 스크립트 추가
  const injectedHtml = htmlContent
    ? rewriteAbsolutePaths(htmlContent).replace(
        /<head>/i,
        `<head><style>html,body{overflow:hidden;margin:0;padding:0;}</style>`
      ).replace(
        '</body>',
        `<script>
          window.addEventListener('load',function(){
            var h=document.documentElement.scrollHeight;
            window.parent.postMessage({type:'resize',height:h},'*');
          });
          document.addEventListener('mousemove', function(e) {
            window.parent.postMessage({ type: 'mousemove', x: e.clientX, y: e.clientY }, '*');
          });
          
          // 모든 이미지를 찾아서 클릭 가능하게 만듭니다.
          document.querySelectorAll('img').forEach(function(img) {
            img.style.cursor = 'zoom-in'; 
            img.addEventListener('click', function() {
              window.parent.postMessage({ type: 'openImage', src: this.src }, '*');
            });
          });
        </script></body>`
      )
    : ''

  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px var(--px) 12px',
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

      <div style={{
        margin: '0 var(--px)', aspectRatio: '16/9',
        background: 'var(--gray-100)', border: '1px solid var(--gray-200)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        {(project.thumbnail || project.images?.[0])
          ? <img src={project.thumbnail || project.images[0]} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: '14px', color: 'var(--gray-400)' }}>{project.title}</span>
        }
      </div>

      <div style={{ padding: '32px var(--px)', fontSize: '15px', lineHeight: 1.85, color: '#333', maxWidth: '820px', letterSpacing: 'var(--tracking)' }}>
        {project.excerpt}
      </div>

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

      <div style={{ padding: '40px var(--px) 40px' }}>
        {isLoading ? (
          <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>콘텐츠를 불러오는 중...</p>
        ) : injectedHtml ? (
          <div style={{ position: 'relative' }}>
            <iframe
              ref={iframeRef}
              srcDoc={injectedHtml}
              style={{
                width: '100%',
                height: iframeHeight,
                border: 'none',
                display: 'block',
                overflow: 'hidden',
              }}
              scrolling="no"
              sandbox="allow-scripts"
              title="project-content"
            />
          </div>
        ) : (
          <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>
            HTML 콘텐츠 오류
          </p>
        )}
      </div>

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

      {/* ★ 추가됨: 이미지 뷰어 (전체 화면 오버레이) */}
      {lightboxImg && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '40px'
          }}
          onClick={() => setLightboxImg(null)}
        >
          <img 
            src={lightboxImg} 
            alt="Enlarged view" 
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 32px rgba(0,0,0,0.5)' }} 
          />
        </div>
      )}
    </>
  )
}