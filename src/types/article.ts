import type { User } from "./user"

export type ArticleStatus = 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'published'

export type Article = {
  id: number
  author_id: number
  title: string
  abstract: string
  file_path: string | null
  status: ArticleStatus
  created_at: string
  updated_at: string
  published_at: string | null
  ai_decision: string | null
  author: User
  reviews: any;
}