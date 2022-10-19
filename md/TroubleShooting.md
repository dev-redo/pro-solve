# 트러블 슈팅

## 목차
- [background와 contentscript 간의 메세징 비동기 이슈](#background와-contentscript-간의-메세징-비동기-이슈)
- [익스텐션 세부사항 변경 시 에러](#익스텐션-세부사항-변경-시-에러)

<br />

## background와 contentscript 간의 메세징 비동기 이슈

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
const uploadResult = await new Promise<boolean>(resolve => {
  chrome.runtime.sendMessage({ method: 'postCurrentSolution' }, response => {
    resolve(response.status);
    console.log('[Pro Solve] 코드 업로드 성공 여부 :>>', response.status);
  });
});
```

<br />

## 익스텐션 세부사항 변경 시 에러

익스텐션 세부사항을 변경한 후 새로고침을 하지 않은 채 크롬 익스텐션을 이용하게 될시 아래의 에러가 발생한다.

```jsx
Uncaught Error: Extension context invalidated.
```

익스텐션의 세부사항을 변경할 시 익스텐션이 reload가 된다. reload가 되면 이전의 콘텐츠 스크립트가 제거되지 않은 채 새로운 콘텐츠 스크립트가 생성되게 된다. 이 때 새로고침을 하지 않게되면 메세지 패싱시 이전의 콘텐츠 스크립트로 소통을 하려고 하는데, 이 때 에러가 발생하게 된다.

이 때 이전의 content script의 chrome.runtime.id는 undefined가 된다.

따라서 새로고침을 하여 새로운 콘텐츠 스크립트가 백그라운드와 메세지를 패싱할 수 있게끔 해주어야 한다. <br />

(ref) [stackoverflow - "Chrome Extension: Extension context invalidated when getting URL"](https://stackoverflow.com/questions/63521378/chrome-extension-extension-context-invalidated-when-getting-url)
