import { atom } from 'recoil'

export interface PostListTypes {
  id: string
  category: string
  category_color: string
  created_time: string
  title: string
  preview: string
}

export const postList = atom<PostListTypes[]>({
  key: 'postList',
  default: [],
})
