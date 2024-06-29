import { atom } from 'recoil'

export const isLoadingState = atom<boolean>({
  key: 'isLoading',
  default: false,
})
