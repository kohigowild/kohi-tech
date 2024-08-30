declare module 'react-syntax-highlighter' {
  import { ComponentType } from 'react'

  export const Prism: ComponentType<any>
  export const Light: ComponentType<any>
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const materialDark: any
  export const materialLight: any
  // 추가적인 스타일을 원하면 여기에 정의
}

declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
  export const a11yDark: any
  export const a11yLight: any
  // 추가적인 스타일을 원하면 여기에 정의
}
