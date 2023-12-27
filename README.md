# 오늘은 어디
<br/>

![541121112](https://github.com/swp91/todayExercise/assets/97070078/1cc73c81-f349-4bf3-85aa-5e4965a502de)

<br/>

## 프로젝트소개<br/>
간단하게 운동을 설정하고 기록하며, 지난 운동 기록들을 확인할수 있는 소규모 웹 프로젝트입니다.<br/>
배포주소 : https://today-exercise.vercel.app/
<br/>
<br/>

## 개발환경<br/>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white">
<br/>
<br/>

## 멤버<br/>

**유재준[BE]**<br/>
프로젝트 기획 및 백엔드 담당<br/>
git : https://github.com/TodayExcercise/TodayExercise
<br/>
<br/>

**박성우[FE]** <br/>
프론트엔드 담당<br/>
<br/>
<br/>

## 사용 라이브러리<br/>
|이름|사용이유|
|----|--------|
|axios|fetch에 비해 코드가 간결해지고, 자동 JSON변환 등 여러 편의성을 제공함|
|recoil|상태관리에 필요한 여러 편의 훅들을 제공하고, redux 같은 상태관리도구에 비해 보일러플레이트코드가 없어서 사용이 간결하고 직관적이다|
|react-hook-form|비제어컴포넌트로 관리하기때문에 값이 늘어나도 state로 관리할 필요가 없어서 코드가 간결해지면서 리렌더링도 최소화시켜주고, 유효성검사를 간결하고 편리하게 관리할 수 있다|
|tailwindcss|emotion 및 styled-components같은 CSS-in-JS만 사용해봤기에 tailwindcss를 한번 경험해보고 싶어서 사용해보았습니다|
|browser-image-compression|사용자가 프로필사진을 등록할때, 무분별하게 대용량의 이미지를 올릴 우려도 있기에 백엔드 전송전에 이미지용량을 압축해주는 용도로 사용하였습니다.|
|react-toastify|여러 경고나 알림문구를 토스트팝업창으로 표시해주기 위해 사용하였습니다.|
<br/>
<br/>
<br/>

## 트러블 슈팅

<br/>

### 1. 세션 로그인<br/>

이번 프로젝트에서 로그인방식을 JWT토큰이 아닌 세션방식으로 하기로 했는데 문제가 발생했다.<br/>
응답값에선 세션쿠키가 잘 날라오는데 실제로 쿠키에 세션이 셋팅이 안되는 버그가 발생했었다.<br/>
이는 SameSite=Lax 속성떄문이었는데, SameSite가 Lax 속성일때는 프론트엔드와 백엔드의 도메인과 포트가 모두 같아야만 전송된다는점 떄문이었다.<br/>
이 속성은 CSRF를 방지하기위해 사용되는 속성인데, 그렇기에 찾아보니 SameSite를 None으로 설정해주고, <br/>
백엔드를 https 환경으로 배포하면 세션이 될것같다고 의견을 전달 드렸고, 실제로 https 후에 세션이 잘 셋팅되어 로그인 문제가 해결이 되었다.<br/>
알아보니, SameSite는 CSRF 의 보안적 문제를 해결하기 위해 나온 기술이고, None 속성은 SameSite가 등장하기 전의 동작방식으로 전송하게 하는 속성이었다.<br/>
그래서 Secure 속성을 추가해 HTTPS 환경에서만 전송되도록 보장하는 속성이다.<br/>
이를 통해 브라우저의 쿠키에 세션값이 정상적으로 셋팅되고, 이 세션값을 통해 해당 유저를 식별하고 사이트를 이용할 수 있게 하였다.<br/>
<br/>
<br/>

### 2. 리액트의 생명주기 문제<br/>

처음 운동기록 페이지를 만들었을땐, 운동페이지를 벗어날거란 생각없이 해당 페이지에서만 타이머가 작동하도록 만들었다.<br/>
그러나, 해당 페이지를 벗어나고 다른 페이지에서 볼일을 보는중에도 계속 타이머를 유지시켜서 진행하도록 하고싶었다.<br/>
그래서 타이머의 값과 상태를 전역상태로 관리하고 타이머 작동함수부분만 따로 훅으로 분리하였는데,<br/>
문제는 다른 페이지로 이동했다가 돌아오면 운동페이지가 재마운트되고, 이 과정에서 해당 타이머훅이 재 실행되면서<br/>
기존의 인터벌을 참조하는 Ref값이 초기화되어 이전값이 손실되고, 타이머가 중복으로 실행되던 문제가 발생하였다.<br/>
이는 리액트의 생명주기 문제라고 할수있는데, 여러 페이지를 이동하며 해당 타이머페이지의 마운트와 언마운트 과정을 거치며 모든 상태와<br/>
변수가 초기화되는데, 이는 타이머훅에서 사용하는 상태와 변수에도 적용된다는 것이다.<br/>
즉, 타이머 훅에서 useRef를 사용하여 타임을 관리하고있는데, 이 타임은 해당 컴포넌트의 생명주기에 묶여있으므로 <br/>
해당 페이지가 언마운트된후 다시 마운트될때 타임이 초기화되어 기존에 실행되던 타이머가 참조를 잃어버리는 문제였다.<br/>
그래서 타이머 훅을 모듈화시켜서 해당 문제를 해결할 수 있었는데,<br/>
모듈을 사용하면 현재 타이머의 상태를 컴포넌트의 생명주기와 독립적으로 관리할 수 있기 때문이다.<br/>
Javascript 모듈로 그 상태는 모듈의 내부변수로 저장하며 이 모듈이 해당 페이지에서 여러번 import되더라도 상태가 항시 공유가 된다.<br/>
이로 인해 얻는 이점은 컴포넌트의 마운트,재마운트에 영향을 받지않으며 서로 다른 컴포넌트간에도 상태를 공유할 수 있다.<br/>
이렇게 모듈화 변경후에 타이머 실행후, 의도대로 다른 페이지간 이동에도 현재의 타임 인터벌을 일관성 있게 유지시킬 수 있었다.<br/>
<br/>
<br/>
