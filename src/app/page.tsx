import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WorkGrid from '@/components/WorkGrid'

export default function WorkPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ paddingTop: '70px', flex: 1 }}>
        <WorkGrid />
      </main>
      <Footer />
    </div>
  )
}
