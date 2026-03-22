import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectDetailClient from './ProjectDetailClient'
import { getAllProjectIds } from '../data/projects-content'

interface Props { params: { id: string } }

export function generateStaticParams() {
  return getAllProjectIds()
}

export default function ProjectDetailPage({ params }: Props) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ paddingTop: '70px', flex: 1 }}>
        <ProjectDetailClient projectId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
