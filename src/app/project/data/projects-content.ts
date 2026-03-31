export interface Project {
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

export const projects: Project[] = [
  {
    id: '1',
    title: '과거 기록',
    description: '고등학교 때 그린 그림 공개',
    excerpt: '',
    category: 'Illustration',
    client: '-',
    year: '2019 ~ 2024',
    duration: '12개월',
    team: [''],
    tags: [''],
    images: ['/images/projects/1.png'],
    type: 'WEB/MOBILE DEVELOPMENT',
    thumbnail:'/images/projects/past/file1.png',
    featured: true,
    hasTbu: false,
  },
]

export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
export function getAllProjects(): Project[] { return projects }
export function getFeaturedProjects(): Project[] { return projects.filter(p => p.featured) }
export function getAllProjectIds() { return projects.map(p => ({ id: p.id })) }
