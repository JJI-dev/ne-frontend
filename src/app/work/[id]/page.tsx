import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WorkDetailClient from './WorkDetailClient'
import { getProject, getAllProjectIds } from '../data/work-content'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return getAllProjectIds()
}

export default async function WorkDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const project = getProject(id)
  if (!project) notFound()

  const filePath = path.join(process.cwd(), 'content/works', `${id}.mdx`)
  let mdxContent = ''

  try {
    const file = fs.readFileSync(filePath, 'utf8')
    const { content } = matter(file)
    mdxContent = content
  } catch (e) {
    // ✨ ne.jji.kr 에 맞춰 수정한 에러 화면 (스타일은 인라인으로)
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: '0 var(--px)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.04em', marginBottom: '12px', color: 'var(--black)' }}>
            앗! 아직 파일이 없어요.
          </h2>
          <p style={{ color: 'var(--gray-400)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
            열심히 작성 중이거나 경로가 잘못된 것 같아요.<br />
            <code style={{ fontSize: '12px', background: 'var(--gray-100)', padding: '4px 8px', borderRadius: '6px', marginTop: '12px', display: 'inline-block', color: 'var(--gray-600)' }}>
              content/works/{id}.mdx
            </code>
          </p>
          <a href="/work" style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--black)', color: '#fff', borderRadius: '100px', fontSize: '14px', fontWeight: 600 }}>
            목록으로 돌아가기
          </a>
        </main>
        <Footer />
      </div>
    )
  }

  const components = {
    img: (props: any) => (
      <img {...props} className="zoomable-img" style={{ cursor: 'zoom-in' }} />
    ),
    div: ({ className, children, ...props }: any) => {
      if (className === 'image-row' || className === 'section') {
        return (
          <div className={className} {...props}>
            {Array.isArray(children)
              ? children.map((child: any) => child.type === 'p' ? child.props.children : child)
              : children}
          </div>
        )
      }
      return <div className={className} {...props} />
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <WorkDetailClient project={project}>
          <MDXRemote source={mdxContent} components={components} />
        </WorkDetailClient>
      </main>
      <Footer />
    </div>
  )
}