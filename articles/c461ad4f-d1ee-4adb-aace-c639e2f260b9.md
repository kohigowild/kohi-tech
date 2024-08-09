---
title: 내 코드를 NPM에 배포해 보았다
category: Notes 📝
created_time: 2024-07-31
---

요즘 알고리즘 관련 포스트를 작성하다 보니까 문법 강조 없는 코드 블록이 너무 심심했다. 내 블로그에서 코드 블록은 편집 기능도 필요 없고 단순 뷰어의 기능만 하면 되는데, 사용하기에 복잡하거나 무거운 라이브러리는 쓰기 싫었다. 그래서 직접 가볍고 짱쉽게 라이브러리를 한 번 만들어 보기로 함…


![5467b28a045dbf189f94aa910ffab5e1.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/cfdb6066-1ea4-490e-bc14-6b33d6a0ffe4/5467b28a045dbf189f94aa910ffab5e1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T135018Z&X-Amz-Expires=3600&X-Amz-Signature=a9191c365251503cd1e09d483c03d7ea34d3b47b54294bc6b47cd57aabbba405&X-Amz-SignedHeaders=host&x-id=GetObject)


이런 나 제법 멋져잉


## ☘️ 사전 준비


```javascript
npm login
```


npm 계정 생성 후 로컬 터미널에 로그인 때려준다.


```json
// tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx",
    "declaration": true,
    "outDir": "./dist"
  },
  "include": ["./src/lib/**/*.tsx", "./src/lib/**/*.ts"]
}
```

- noEmit: 컴파일 시 .ts 파일을 .js 파일로 변환하여 출력한다. 이는 라이브러리를 사용할 다른 개발자들이 TypeScript로 작성된 소스를 자바스크립트 환경에서 사용할 수 있게 해준다. (false인 경우)
- declaration:  타입 정의 파일(.d.ts 파일)을 생성한다. 타입스크립트 사용 시 해당 옵션을 true로 설정한다.
- outDir: 컴파일된 자바스크립트 파일과 타입 정의 파일을 출력할 디렉토리를 지정하는 옵션

```json
// package.json

{
  "name": "rc-syntax-highlight",
  "version": "0.0.7",
  "private": false,
  "main": "dist/index.js",
  "style": "dist/index.css",
  "types": "dist/index.d.ts",
  "files": [
    "dist/**/*"
  ],
  "browser": "./browser/specific/main.js",
  "description": "simple code block components",
  "repository": {
    "type": "git",
    "url": "https://github.com/kohigowild/rc-syntax-highlight"
  },
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.104",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "tsc && cp src/lib/*.css dist/",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "prepare": "rm -rf dist && mkdir dist && tsc && cp src/lib/*.css dist/"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```


### 1. 기본 정보

- name: 패키지의 이름
- version: 패키지의 현재 버전, 배포 시 버전을 올려서 배포한다.
- private: 패키지가 비공식적인(private) 패키지인지 여부
- description: 패키지에 대한 간단한 설명
- repository: 패키지의 저장소 정보

### 2. 진입점 및 스타일

- main: 패키지의 주요 자바스크립트 진입점 파일을 지정, 다른 모듈이 이 패키지를 require하거나 import할 때 이 파일이 사용된다.
- style: 패키지의 주요 CSS 파일을 지정한다.
- types: TypeScript 사용자들을 위한 타입 정의 파일의 경로

### 3. 배포 파일 설정

- files: 배포할 파일과 디렉토리를 지정한다.
- browser: 브라우저 환경에서 사용할 별도의 진입점 파일을 지정한다. 브라우저에서 이 패키지를 사용할 때 로드될 파일

### 4. scripts:

- build: "tsc && cp src/lib/*.css dist/"
	- TypeScript 파일을 컴파일하고, CSS 파일을 dist 디렉토리로 복사한다.
- prepare: "rm -rf dist && mkdir dist && tsc && cp src/lib/*.css dist/"
	- dist 디렉토리를 삭제하고 새로 생성한 후, TypeScript 파일을 컴파일하고 CSS 파일을 복사한다. 일반적으로 prepare 스크립트는 배포 전에 실행된다.

```bash
// .npmignore

node_modules/
src/
public/
tsconfig.json

!dist/
```


![3573c7789d091f4b432d71b039264417.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/2cb4c5b9-f02f-4918-99a4-a12dbf99cfa7/3573c7789d091f4b432d71b039264417.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T135018Z&X-Amz-Expires=3600&X-Amz-Signature=2d59beeaf18c1ec36d8229ca806bc63f785597222e3d9c932451ce29e7af7c5e&X-Amz-SignedHeaders=host&x-id=GetObject)


## ☘️ npm 배포


```bash
npm run build
```


패키지 빌드


```bash
npm publish
```


패키지 배포


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-31_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.38.05.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/d72ca1a6-414a-4f2e-b246-3b78e1aadb5a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-31_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.38.05.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T135018Z&X-Amz-Expires=3600&X-Amz-Signature=818cd39be2f8ccd6b84c09e3cb20c080e6a21e262e286ce68cd17c4f107f0dee&X-Amz-SignedHeaders=host&x-id=GetObject)


짜자잔… 🫲 내 첫 번째 오픈 소스 링크 🫱


[https://www.npmjs.com/package/rc-syntax-highlight](https://www.npmjs.com/package/rc-syntax-highlight)


```bash
npm i rc-syntax-highlight
```


## Reference


[https://velog.io/@junghyeonsu/NPM-배포-어렵지-않아요-with-테오-구글-스프린트-4기](https://velog.io/@junghyeonsu/NPM-%EB%B0%B0%ED%8F%AC-%EC%96%B4%EB%A0%B5%EC%A7%80-%EC%95%8A%EC%95%84%EC%9A%94-with-%ED%85%8C%EC%98%A4-%EA%B5%AC%EA%B8%80-%EC%8A%A4%ED%94%84%EB%A6%B0%ED%8A%B8-4%EA%B8%B0)

