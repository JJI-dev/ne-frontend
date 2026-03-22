export interface Project {
  id: string
  title: string
  description: string
  excerpt: string
  category: 'Web' | 'Mobile' | 'Design' | 'Illustration' | 'Graphics' | 'Video'
  client?: string
  year: string
  duration: string
  team: string[]
  tags: string[]
  images: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  type?: string
  thumbnail?: string
  hasTbu?: boolean
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'SmileMe (이모티콘 제작 플랫폼)',
    description: '다날엔터테인먼트와의 협업으로 진행된 이모티콘 제작 및 판매 플랫폼',
    excerpt: '뷰티카메라 SDK와 AI 감정분석 기술을 활용한 차별화된 UX 구현, 사용자 전환율 22.1% 향상 및 클라이언트 MOU 체결 성공.',
    category: 'Mobile',
    client: '(주) 브릭메이트',
    year: '2024',
    duration: '12개월',
    team: ['Project Manager', 'iOS Developer', 'Android Developer', 'Backend Developer'],
    tags: ['Mobile', 'Admin', 'AI', 'UX'],
    images: [],
    type: 'WEB/MOBILE DEVELOPMENT',
    featured: true,
    hasTbu: false,
  },
  {
    id: '2',
    title: 'Remaker (명품 리폼/수선 중개 플랫폼)',
    description: '프리미엄 중고 명품 리폼 서비스와 전문 마스터를 연결하는 모바일 플랫폼',
    excerpt: '카카오 알림톡 API 연동을 통한 실시간 알림 시스템 구축, 사용자 재의뢰율 12.3% 향상.',
    category: 'Mobile',
    client: '(주) 브릭메이트',
    year: '2023',
    duration: '8개월',
    team: ['Project Manager', 'iOS Developer', 'Android Developer'],
    tags: ['Mobile', 'Fintech'],
    images: [],
    type: 'MOBILE DEVELOPMENT',
    featured: true,
    hasTbu: false,
  },
  {
    id: '3',
    title: '밀당365 (혈당 관리 플랫폼)',
    description: '당뇨병 환자를 위한 혈당 관리 및 건강 정보 제공 모바일 앱',
    excerpt: '이벤트 참여율 6%에서 48%로 대폭 개선, Google Analytics 기반 MAU 1천 명 이상 달성.',
    category: 'Mobile',
    client: '(주) 브릭메이트',
    year: '2023',
    duration: '6개월',
    team: ['Project Manager', 'iOS Developer', 'Backend Developer'],
    tags: ['Healthcare', 'UX'],
    images: [],
    type: 'MOBILE DEVELOPMENT',
    featured: false,
    hasTbu: true,
  },
  {
    id: '4',
    title: 'TMF (Time Management Framework)',
    description: '개인 업무 스케줄링 툴 — GTD 기반 UX 플로우 및 UI 구조 설계',
    excerpt: 'Inbox – Planning Desk – Calendar – Archive 단계로 서비스 플로우를 정의한 개인 생산성 도구.',
    category: 'Web',
    client: '-',
    year: '2024',
    duration: '2개월',
    team: ['Solo'],
    tags: ['Web', 'GTD', 'Productivity'],
    images: [],
    type: 'WEB DEVELOPMENT',
    featured: false,
    hasTbu: true,
  },
]

export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
export function getAllProjects(): Project[] { return projects }
export function getFeaturedProjects(): Project[] { return projects.filter(p => p.featured) }
export function getAllProjectIds() { return projects.map(p => ({ id: p.id })) }
