import {
  printLoadingText,
  createShowSolutionsButton,
  uploadCurrentSolution,
} from '@src/service/testPage/problemUpload';
import { createMemoTabButton } from '@src/service/testPage/memo';

// TODO: 문제 아이디어 아카이빙 탭 생성 기능
// createMemoTabButton();

// 문제 업로드 기능
import { setUserInfoStorage } from '@src/api/solution/setUserInfoStorage';
(async () => await setUserInfoStorage())();

const $submitBtn = document.querySelector('#submit-code') as HTMLButtonElement;
const $modal = document.querySelector('.modal') as HTMLDivElement;
const modalMutationOption = {
  childList: true,
};

const modalMutationObserver = new MutationObserver(mutations => {
  if (!mutations.length) return;

  printLoadingText();
  createShowSolutionsButton();

  uploadCurrentSolution();
  modalMutationObserver.disconnect();
});

const isUserLoggedIn = $submitBtn !== null;
if (isUserLoggedIn) {
  $submitBtn.addEventListener('click', () => {
    modalMutationObserver.observe($modal, modalMutationOption);
  });
}
