# 트러블 슈팅

# 목차

- [트러블 슈팅](#트러블-슈팅)
- [목차](#목차)
  - [1. 구글 Oauth로 로그인하기](#1-구글-oauth로-로그인하기)
  - [2. background와 contentscript 간의 메세징 비동기 이슈](#2-background와-contentscript-간의-메세징-비동기-이슈)
  - [3. 익스텐션 세부사항 변경 시 에러](#3-익스텐션-세부사항-변경-시-에러)
  - [4. 문제 정보 자동 크롤링 이슈](#4-문제-정보-자동-크롤링-이슈)

<br />

## 1. 구글 Oauth로 로그인하기

자료를 찾아봐도 크롬 익스텐션에서 로그인 하는 방법은 나와있으나 동작 원리에 대한 설명이 별로 없어서 가장 헤맸던 기능이다. <br />

나는 프로그래머스에서 풀이를 제출 시 firebase database로 풀이 정보를 fetch하는 작업을 하고자 하였다. <br />

해당 작업을 하기 위해서 인증이 필요하기에 Popup에서 구글 Oauth로 로그인처리를 하면 content.js에서 로그인이 필요한 작업을 수행할 수 있게끔 구현하고 싶었다.

하지만 Popup의 로직은 popup이 열려있는 상태일 때만 실행되며, 로그인을 위해 필요한 chrome identity api가 popup과 background(service worker) 이용이 가능하다.

따라서 나는 Popup에서 로그인을 하고 content js에서 firebase database 작업을 background와 Message passing을 통해 수행하였다.

popup에서 로그인을 할 시 getAuthToken에서 accessToken을 캐싱하게 되는데, 이를 통해 크롬 익스텐션 background과 popup에서 로그인 인증처리가 유지될 수 있게 된다.

<br />

## 2. background와 contentscript 간의 메세징 비동기 이슈

<p align="center">
  <img src="https://imgur.com/nLYR6fv.png" width="800">
</p>

아래 과정을 수행하려고 할 때 위의 에러가 발생하였다.

1. content script에서 background로 메세지 전송 (sendMessage)
2. background에서 비동기 처리 후 결과를 content script에 응답 (sendResponse)
3. content script에서 결과를 받은 후 작업 수행

이슈를 보면 응답을 받기 전 이미 content script의 port가 닫혔다고 나와있다. <br />
이슈가 발생했을 시 코드는 아래와 같다.

```js
// 이슈 코드: background
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.method === 'postCurrentSolution') {
    try {
      // 비동기 작업 생략

      sendResponse({ status: true });
    } catch (error) {
      console.log('[Pro Solve] 로그인을 하지 않아 업로드가 되지 않습니다!', error);
      sendResponse({ status: false });
    }
  }

  return true;
});

// 이슈코드: content script
chrome.runtime.sendMessage({ method: 'postCurrentSolution', data: { code } }, response => {
  resolve(response.status);
  console.log('[Pro Solve] 코드 업로드 성공 여부 :>>', response.status);
});
```

해당 이슈는 onMessage의 addListener 콜백 반환의 문제였다.

1. async function의 반환은 항상 promise로 감싸진다.
2. addListener 콜백의 반환은 true 일때만 response 비동기적으로 보낼 수 있도록 채널 열어둔다. ( [docs - onMessage 설명](https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage) )
3. async function을 addListener 콜백으로 등록해버리면 반환이 Promise<boolean>이 되며, 이것은 true가 아니다 = 즉 비동기적으로 동작하도록 두지 않는다.

따라서 아래와 같이 수정하여 해결하였다.

```js
// 수정 코드: background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'postCurrentSolution') {
    (async () => {
      try {
        // 비동기 작업 생략

        sendResponse({ status: true });
      } catch (error) {
        console.log('[Pro Solve] 로그인을 하지 않아 업로드가 되지 않습니다!', error);
        sendResponse({ status: false });
      }
    })();
    return true;
  }
});

// 수정코드: content script
const uploadResult =
  (await new Promise()) <
  boolean >
  (resolve => {
    chrome.runtime.sendMessage({ method: 'postCurrentSolution' }, response => {
      resolve(response.status);
      console.log('[Pro Solve] 코드 업로드 성공 여부 :>>', response.status);
    });
  });
```

<br />

## 3. 익스텐션 세부사항 변경 시 에러

익스텐션 세부사항을 변경한 후 새로고침을 하지 않은 채 크롬 익스텐션을 이용하게 될시 아래의 에러가 발생한다.

```jsx
Uncaught Error: Extension context invalidated.
```

익스텐션의 세부사항을 변경할 시 익스텐션이 reload가 된다. reload가 되면 이전의 콘텐츠 스크립트가 제거되지 않은 채 새로운 콘텐츠 스크립트가 생성되게 된다. 이 때 새로고침을 하지 않게되면 메세지 패싱시 이전의 콘텐츠 스크립트로 소통을 하려고 하는데, 이 때 에러가 발생하게 된다.

이 때 이전의 content script의 chrome.runtime.id는 undefined가 된다.

따라서 새로고침을 하여 새로운 콘텐츠 스크립트가 백그라운드와 메세지를 패싱할 수 있게끔 해주어야 한다. <br />

(ref) [stackoverflow - "Chrome Extension: Extension context invalidated when getting URL"](https://stackoverflow.com/questions/63521378/chrome-extension-extension-context-invalidated-when-getting-url)

<br />

## 4. 문제 정보 자동 크롤링 이슈

현재 프로솔브는 리소스를 줄이기 위해 [해당 리포지토리](https://github.com/dev-redo/programmers-problems)에서 Github action으로 전체 문제 정보를 6시간마다 크롤링 후 cdn을 통해 제공하고 있다.

그러기 위해 6시간마다 크롤링을 한 후, 크롤링한 정보와 현재 문제 정보가 저장되어 있는 `problems.json`과 비교를 한 후, 변경사항이 있을 때마다 push하고자 하였다.

그래서 파일의 변경 사항을 추적하기 위한 github action으로 paths-filter를 이용하였다.

초기 action 구성은 아래와 같았다.

```
- name: Check Problem.json is Change
  uses: dorny/paths-filter@v2
  id: filter
  with:
    filters: |
      problems:
        - 'problems.json'
```

이 경우 아래와 같이 remote 에서 변경 사항을 확인되었다.

<p align="center">
  <img src="https://imgur.com/xs7LQwQ.png" width="800">
</p>

`git diff A..B` 는 Commit `A` 와 Commit `B` 를 서로 비교한다.

먼저 Commit `A` 를 확인해보자

<p align="center">
  <img src="https://imgur.com/taPj9tW.png" width="800">
</p>

해당 Commit과 비교하는 Commit은 `remote/origin/main`이다.

현재 remote/origin/main을 보면 아래와 같다.

<p align="center">
  <img src="https://imgur.com/xs7LQwQ.png" width="800">
</p>

사진을 보면 sync-problems.yaml 파일 하나만 변경사항이 존재한다고 계속 나오고 있다!

우리가 원하는 것은 로컬의 `problems.json` 변경사항이다.
따라서 Commit `B`가 remote가 아닌 local이 되어야 한다.

```
- name: Check Problem.json is Change
  uses: dorny/paths-filter@v2
  id: filter
  with:
    base: HEAD
    filters: |
      problems:
        - 'problems.json'
```

문서에서 paths-filter가 `local diff`를 하기 위해서는 `base: HEAD`로 명시하라고 나온다.

그럼 아래와 같이 action이 동작하게 된다.

<p align="center">
  <img src="https://imgur.com/e2fL7rQ.png" width="800">
</p>

현재의 HEAD와 local Modified와 비교하게 되니, 우리가 원하던 `problems.json` 변경만 추적되는 것을 확인할 수 있다.
