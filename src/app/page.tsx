import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WorkGrid from '@/components/WorkGrid'
import ScrollToTop from '@/components/ScrollToTop'

export default function WorkPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ paddingTop: '80px', flex: 1 }}>
        <WorkGrid />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
