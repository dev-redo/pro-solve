import {
  printLoadingText,
  createShowSolutionsButton,
  uploadCurrentSolution,
} from '@src/service/testPage/problemUpload';

// TODO: 메모장 기능

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
