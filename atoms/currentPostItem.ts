import { atom } from 'recoil'

export interface PostListTypes {
  id: string
  category: string
  category_color: string
  created_time: string
  title: string
  preview: string
}

export const currentPostItem = atom<PostListTypes>({
  key: 'currentPostItem',
  default: {
    id: '',
    category: '',
    category_color: '',
    created_time: '',
    title: '',
    preview: '',
  },
})
