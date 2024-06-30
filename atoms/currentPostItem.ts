import { atom } from 'recoil'

export const currentPostItem = atom<any>({
  key: 'currentPostItem',
  default: {
    id: '',
    category: '',
    created_time: '',
    title: '',
    preview: '',
  },
})
