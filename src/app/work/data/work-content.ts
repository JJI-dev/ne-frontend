export interface Work {
  id: string
  title: string
  description: string
  excerpt: string
  category: 'Illustration' | 'Graphics' | 'Design' | 'Video' | '.'
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

export const projects: Work[] = [
  {
    id: '1',
    title: '과거 기록',
    description: '고등학교 때 그린 그림 공개',
    excerpt: '',
    category: 'Illustration',
    client: '-',
    year: '2019 ~ 2025',
    duration: '12개월',
    team: [''],
    tags: [''],
    images: ['/images/projects/past/file1.png'],
    type: 'ETC',
    thumbnail:'/images/projects/past/file1.png',
    featured: true,
    hasTbu: false,
  },
]

export function getWork(id: string): Work | undefined {
  return projects.find(p => p.id === id)
}
export function getAllWorks(): Work[] { return projects }
export function getFeaturedWorks(): Work[] { return projects.filter(p => p.featured) }
export function getAllWorkIds() { return projects.map(p => ({ id: p.id })) }
