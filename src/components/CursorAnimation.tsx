'use client'

import { useEffect, useRef } from 'react'

export default function CursorAnimation() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const dotEl = dot
    const ringEl = ring

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let raf: number
    let isDark = false

    function setColors(dark: boolean) {
      if (isDark === dark) return
      isDark = dark
      const color = dark ? '#ffffff' : '#0a0a0a'
      dotEl.style.background = color
      ringEl.style.borderColor = color
    }

    function setSize(big: boolean) {
      dotEl.style.width = big ? '4px' : '8px'
      dotEl.style.height = big ? '4px' : '8px'
      ringEl.style.width = big ? '52px' : '36px'
      ringEl.style.height = big ? '52px' : '36px'
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dotEl.style.left = mouseX + 'px'
      dotEl.style.top = mouseY + 'px'

      // nav panel(#nav-overlay-panel) 또는 X버튼(z:201, 다크 bg 위) 위에 있는지 확인
      const el = document.elementFromPoint(mouseX, mouseY)
      const onDark = !!(
        el?.closest('#nav-overlay-panel') ||
        el?.closest('[data-cursor-dark]')
      )
      setColors(onDark)
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ringEl.style.left = ringX + 'px'
      ringEl.style.top = ringY + 'px'
      raf = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    // 호버 대상 크기 변화
    const addHoverListeners = () => {
      document.querySelectorAll<Element>('a, button, [role="button"], .work-item').forEach(el => {
        if (el.getAttribute('data-cursor-listener')) return
        el.setAttribute('data-cursor-listener', '1')
        el.addEventListener('mouseenter', () => setSize(true))
        el.addEventListener('mouseleave', () => setSize(false))
      })
    }
    addHoverListeners()
    const mo = new MutationObserver(addHoverListeners)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
