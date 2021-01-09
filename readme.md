## 개발 환경
nodejs가 설치되어있어야 합니다.
* https://nodejs.org/en/ 에서 최신 버전 받기 (작성일 기준 14.15.3)
* 패키지 매니저는 npm 사용합니다. (권장사항: yarn 같이 쓰지 마세용)
vscode pluglin들이 요구됩니다.
* prettier
* eslint
* vscode-styled-components
## 설치/실행
```bash
npm install
npm run dev
```
## 개발시 폴더 구성
폴더는 다음과 같이 이루어져있습니다.
* src: style, components, page를 담고 있는 폴더
    * style: styled components에 쓸 것들 
    * components: pages 폴더에 export 될 컴포넌트들
        * 되도록 단일 기능을 담고있도록 해주세요
        * link 단위로 나누어주세요 예) `/board`에 사용되는 component는 board 폴더에
            * 단, index.jsx에 사용되는 component는 home 폴더에 넣어주세요 (index.js index로 넣으면 인식을 못함)
    * pages: 라우팅될 파일입니다.
* public: img, svg 파일을 담고 있습니다.
    * public 폴더에 있는 이미지는 img tag에서 src로 불러올때 `src={'/icon.svg'}`와 같이 불러올 수 있습니다  
### **예시**
```
src
|- style
    |- board.jsx
|- components
    |- board
        |- asdf.jsx
    |- index
        |- asdf.jsx
|- pages
    |- index.jsx
    |- board
        |-[id].jsx
public
    |- login.svg
    |- lock.png
```
