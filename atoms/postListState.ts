import { atom } from 'recoil'

export const postListState = atom<Array<any>>({
  key: 'postList',
  default: [],
})
