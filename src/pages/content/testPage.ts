import { theme } from '../../styles/theme';

const $submitBtn = document.querySelector('#submit-code') as HTMLButtonElement;
const $modal = document.querySelector('.modal') as HTMLDivElement;
const modalMutationOption = {
  childList: true,
};

const modalMutationObserver = new MutationObserver(mutations => {
  if (!mutations.length) return;

  readyToUpload();
  uploadCurrentSolution();
  modalMutationObserver.disconnect();
});

$submitBtn.addEventListener('click', () => {
  modalMutationObserver.observe($modal, modalMutationOption);
});

const readyToUpload = () => {
  const $modalContent = document.querySelector('div.modal-body') as HTMLDivElement;
  $modalContent.innerHTML = `<span>Pro Solve 익스텐션이 결과를 저장합니다.<br />모달 창을 닫으셔도 됩니다.</span>`;

  const modalUploadResult = document.createElement('div');
  modalUploadResult.className = 'modal-upload';
  modalUploadResult.textContent = 'Loading...';
  modalUploadResult.style.color = theme.color.deepBlue;
  $modalContent.append(modalUploadResult);
};

const uploadCurrentSolution = async () => {
  console.log('[Pro Solve] 제출한 코드 업로드를 시작합니다.');

  const data = parsingDomNodeToUpload();
  const uploadResult = await new Promise<boolean>(resolve => {
    chrome.runtime.sendMessage({ method: 'postCurrentSolution', data }, response => {
      resolve(response.status);
      console.log('[Pro Solve] 코드 업로드 성공 여부 :>>', response.status);
    });
  });

  printIsUploadSuccess(uploadResult);
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
