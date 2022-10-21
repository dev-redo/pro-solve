# 프로솔브(Pro-Solve) <img align="right" src="src/static/icon.png" width="40px"/>

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/pjffalefhahlellpckbbiehmbljjhihl)](https://chrome.google.com/webstore/detail/%ED%94%84%EB%A1%9C%EC%86%94%EB%B8%8Cpro-solve/pjffalefhahlellpckbbiehmbljjhihl)
![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/pjffalefhahlellpckbbiehmbljjhihl?label=users%40chrome)
![Chrome Web Store Rating Count](https://img.shields.io/chrome-web-store/rating-count/pjffalefhahlellpckbbiehmbljjhihl)
![Chrome Web Store Ratings](https://img.shields.io/chrome-web-store/rating/pjffalefhahlellpckbbiehmbljjhihl)
[![sync-problems](https://github.com/dev-redo/programmers-problems/actions/workflows/sync-problems.yaml/badge.svg)](https://github.com/dev-redo/programmers-problems/actions/workflows/sync-problems.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Chrome Web Store](https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png)](https://chrome.google.com/webstore/detail/%ED%94%84%EB%A1%9C%EC%86%94%EB%B8%8Cpro-solve/pjffalefhahlellpckbbiehmbljjhihl/related?hl=ko)

## ✨ 지원 기능

프로솔브는 **크롬 브라우저**에서만 이용할 수 있습니다.

|           **성공한 문제 차트**            |            **성공한 문제 표**             |
| :---------------------------------------: | :---------------------------------------: |
| <img src="https://imgur.com/ee3Gjqs.png"> | <img src="https://imgur.com/5BQfmJh.png"> |
|               **풀이 저장**               |             **풀이 클립보드**             |
| <img src="https://imgur.com/pUFGw2U.png"> | <img src="https://imgur.com/DXv3A8N.png"> |

<br />

## 🎞 동작 화면

https://user-images.githubusercontent.com/69149030/196756245-4cccaffe-3f1b-44f9-9309-1585142cb75f.mp4

<p align="center">성공한 문제 차트 & 표</p>

<br />

https://user-images.githubusercontent.com/69149030/194714332-ec61e267-1d86-42e3-89ee-93de7ef969ad.mp4

<p align="center">제출한 풀이 저장 및 보여주기</p>

<br />

https://user-images.githubusercontent.com/69149030/196757224-1fd436c6-cef2-45b7-931f-d216c19c3ae3.mp4

<p align="center">다른 사람 풀이 페이지의 코드 클립보드</p>

<br />

## 💡 왜 만들게 되었나요?

### 기능 1. 성공한 문제 차트 & 표

현재 프로그래머스는 푼 문제 정보를 확인하고 일정 기준을 통해 정렬하기 위해 select 박스를 이용할 수 있습니다.

<img src="https://imgur.com/mqnD5DL.png" />
<p align="center">현재 프로그래머스의 모든 문제 페이지</p>

<br />

좋은 기능이지만 유저가 각 레벨 문제를 몇 개(퍼센트) 풀었는지 확인하기 위해 select 박스를 하나하나 클릭해 계산해야 하는 번거로움이 있습니다. <br />
그래서 백준의 solved.ac를 레퍼런스 삼아 성공한 문제 Chart와 표를 만들었습니다.

Chart는 유저가 각 레벨 문제들을 전체 중 몇 개(퍼센트) 풀었는지, 레벨 비율은 어떤지를 확인할 수 있습니다.

표는 난이도와 완료한 사람, 정답률을 기준으로 정렬한 성공한 문제 list를 확인할 수 있습니다.

유저가 성공한 문제 정보를 받아오기 위해서는 프로그래머스 로그인이 필요합니다.<br />
따라서 로그아웃된 상태일 시 로그인을 하게끔 alert를 띄워주고 있습니다.

<br />

### 기능 2. 제출한 풀이 저장

현재 프로그래머스는 각 언어의 성공한 첫 풀이만을 사용자에게 보여주고 있습니다.

이 점이 아쉬워 사용자가 프로그래머스 문제 풀이 제출 시 저장을 하고 보여주는 기능을 구현하였습니다.

<br />

### 기능 3. 풀이 클립보드

현재 프로그래머스는 다른 사람의 풀이 페이지에서 코드 클립보드 기능을 제공하고 있지 않습니다.

<img src="https://imgur.com/npSn7sF.png" />
<p align="center">현재 프로그래머스의 다른 사람 풀이 페이지</p>

<br />

코드가 길 시 드래그를 하며 복사하기 힘들어 클립보드 기능을 구현하였습니다.

<br />

## 🙋‍♀️ 어떻게 사용할 수 있나요?

프로솔브 익스텐션의 각 기능을 어떻게 이용할 수 있나요? 아래 문서들을 확인해주세요!

- [성공한 문제 차트 & 표 기능 사용법](https://github.com/dev-redo/pro-solve/blob/main/md/HOW_TO_SEE_SOLUTION_INFO.md)
- [제출한 풀이 저장 기능 사용법](https://github.com/dev-redo/pro-solve/blob/main/md/HOW_TO_SAVE_SOLUTION.md)

<br />

## 😲 Q&A

프로솔브 익스텐션을 이용하다가 궁금하신 점이 생기셨나요?

[Q&A](https://github.com/dev-redo/pro-solve/blob/main/md/Q%26A.md) 문서를 참고해주신 다음, 해당 문서에 존재하지 않는 질문일 시 이슈를 남겨주세요

<br />

## 📜 링크 & 문서

- [전체 문제 저장소](https://github.com/dev-redo/programmers-problems)
- [개발 시 경험한 Troble Shooting](https://github.com/dev-redo/pro-solve/blob/main/md/TROUBLE_SHOOTING.md)
