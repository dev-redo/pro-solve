import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from '../../styles/theme';
import { ThemeProvider } from 'styled-components';
import CreateSolutionsButton from '../../components/button/CreateSolutionsButton';
import { addSolvedProblemId } from '../../api/solution/addSolvedProblemId';

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

$submitBtn.addEventListener('click', () => {
  modalMutationObserver.observe($modal, modalMutationOption);
});

const printLoadingText = () => {
  const $modalContent = document.querySelector('div.modal-body') as HTMLDivElement;
  $modalContent.innerHTML = `<span>Pro Solve 익스텐션이 결과를 저장합니다.<br />모달 창을 닫으셔도 됩니다.</span>`;

  const modalUploadResult = document.createElement('div');
  modalUploadResult.className = 'modal-upload';
  modalUploadResult.textContent = 'Loading...';
  modalUploadResult.style.color = theme.color.deepBlue;
  $modalContent.append(modalUploadResult);
};

const createShowSolutionsButton = () => {
  const $selectedLanguage = (
    document.querySelector('div.editor > ul > li.nav-item > a') as HTMLAnchorElement
  ).getAttribute('data-language')!;
  const $problemId = (
    document.querySelector('div.main > div.lesson-content') as HTMLDivElement
  ).getAttribute('data-lesson-id')!;
  const $problemName = (
    document.querySelector('li.algorithm-title') as HTMLLIElement
  ).textContent!.trim();

  const btn = document.createElement('a');
  const root = document.querySelector('div.modal-footer') as HTMLDivElement;
  root.appendChild(btn);
  ReactDOM.createRoot(btn as HTMLElement).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CreateSolutionsButton
          selectedLanguage={$selectedLanguage}
          problemId={$problemId}
          problemName={$problemName}
        />
      </ThemeProvider>
    </React.StrictMode>,
  );
};

const uploadCurrentSolution = async () => {
  console.log('[Pro Solve] 제출한 코드 업로드를 시작합니다.');
  if (chrome.runtime?.id === undefined) {
    printRequestOfRefresh();
    return;
  }

  const data = parsingDomNodeToUpload();
  const { problemId, isSuccess } = data;
  addSolvedProblemId(Number(problemId), isSuccess);

  const uploadResult = await new Promise<boolean>(resolve => {
    chrome.runtime.sendMessage({ method: 'postCurrentSolution', data }, response => {
      resolve(response.status);
      console.log('[Pro Solve] 코드 업로드 성공 여부 :>>', response.status);
    });
  });

  printIsUploadSuccess(uploadResult);
};

const printRequestOfRefresh = () => {
  console.log(
    '[Pro Solve] Pro Solve 익스텐션의 세부사항을 변경해 reload되었습니다. 새로고침을 해주세요.',
  );
  const $modalContent = document.querySelector('div.modal-body') as HTMLDivElement;
  const $modalUploadResult = document.querySelector('div.modal-upload') as HTMLElement;
  $modalUploadResult.remove();

  $modalContent.innerHTML = `<span>Pro Solve 익스텐션의 세부사항을 변경하셨네요!<br />업로드를 하려면 페이지를 새로고침 해주세요.</span>`;
  $modalContent.style.color = theme.color.red;
};

const parsingDomNodeToUpload = () => {
  const solutionResult = (document.querySelector('div.modal-header > h4') as HTMLHeadElement)
    .textContent;
  const isSuccess = solutionResult!.includes('정답');

  const code = (document.querySelector('textarea#code') as HTMLTextAreaElement).value;
  const selectedLanguage = (
    document.querySelector('div.editor > ul > li.nav-item > a') as HTMLAnchorElement
  ).getAttribute('data-language');
  const problemId = (
    document.querySelector('div.main > div.lesson-content') as HTMLDivElement
  ).getAttribute('data-lesson-id');
  const passedTestCase = document.querySelectorAll('td.result.passed').length;
  const failedTestCase = document.querySelectorAll('td.result.failed').length;

  return {
    isSuccess,
    code,
    selectedLanguage,
    problemId,
    passedTestCase,
    failedTestCase,
  };
};

const printIsUploadSuccess = (uploadResult: boolean) => {
  const $modalUploadResult = document.querySelector('div.modal-upload') as HTMLElement;

  if (uploadResult) {
    $modalUploadResult.textContent = '업로드 성공!';
    $modalUploadResult.style.color = theme.color.blue;
    return;
  }

  $modalUploadResult.textContent = '업로드 중 에러가 발생했습니다. 로그인 여부를 확인해주세요!';
  $modalUploadResult.style.color = theme.color.red;
};
