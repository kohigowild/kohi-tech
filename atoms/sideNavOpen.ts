import { atom } from 'recoil'

export const sideNavOpen = atom<boolean>({
  key: 'sideNavOpen',
  default: false,
})
