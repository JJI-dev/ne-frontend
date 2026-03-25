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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <ProjectDetailClient projectId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
