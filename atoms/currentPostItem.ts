import { atom } from 'recoil'

export const currentPostItem = atom<any>({
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
