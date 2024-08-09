import { atom } from 'recoil'

export interface ArticleListTypes {
  id: string
  category: string
  category_color: string
  created_time: string
  title: string
  preview: string
}

export const articleContext = atom<ArticleListTypes[]>({
  key: 'articleContext',
  default: [],
})
