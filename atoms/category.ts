import { atom } from 'recoil'

export interface CategoryIndex {
  category: string
  index: number
}

export const category = atom<any>({
  key: 'category',
  default: [],
})
