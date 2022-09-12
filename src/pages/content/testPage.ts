import { theme } from '../../styles/theme';

const submitBtn = document.querySelector('#submit-code');
const $modal = document.querySelector('.modal');
const modalMutationObserver = new MutationObserver(mutations => {
  if (!!mutations.length) {
    readyToUpload();

    const isFirstAnswer = !!document.querySelector('a#view-solution-group > svg');
    uploadCurrentSolution(isFirstAnswer);
    modalMutationObserver.disconnect();
  }
});

submitBtn.addEventListener('click', () => {
  modalMutationObserver.observe($modal, {
    childList: true,
  });
});

const readyToUpload = () => {
  const modalContent = document.querySelector('div.modal-body');
  modalContent.textContent = 'Pro Solve 익스텐션이 결과를 저장합니다.';

  const modalUploadResult = document.createElement('div');
  modalUploadResult.className = 'modal-upload';
  modalUploadResult.textContent = 'Loading...';
  modalUploadResult.style.color = theme.color.deepBlue;
  modalContent.append(modalUploadResult);
};

const uploadCurrentSolution = async (isFirstAnswer: boolean) => {
  const domNode = parsingDomNodeToUpload();
  // const {
  //   solutionResult,
  //   isSuccess,
  //   code,
  //   selectedLanguage,
  //   problemId,
  //   passedTestCase,
  //   failedTestCase,
  // } = parsingDomNodeToUpload();
  console.log('[Pro Solve] 풀이 여부 :>> ', isFirstAnswer);

  const uploadResult = await new Promise<boolean>(resolve => {
    chrome.runtime.sendMessage({ method: 'postCurrentSolution' }, response => {
      resolve(response.status);
      console.log('[Pro Solve] 코드 업로드 성공 여부 :>>', response.status);
    });
  });

  printIsUploadSuccess(uploadResult);
};

const parsingDomNodeToUpload = () => {
  const solutionResult = document.querySelector('div.modal-header > h4').textContent; // 풀이 결과: 정답입니다 or 틀렸습니다!
  const isSuccess = solutionResult.includes('정답') ? true : false; // 정답 여부

  const code = (document.querySelector('textarea#code') as HTMLTextAreaElement).value; // 제출한 풀이
  const selectedLanguage = (
    document.querySelector('div.editor > ul > li.nav-item > a') as HTMLAnchorElement
  ).getAttribute('data-language'); // 풀이한 언어
  const problemId = document
    .querySelector('div.main > div.lesson-content')
    .getAttribute('data-lesson-id');
  const passedTestCase = document.querySelectorAll('td.result.passed').length; // 성공한 테케 개수
  const failedTestCase = document.querySelectorAll('td.result.failed').length; // 실패한 테케 개수

  return {
    solutionResult,
    isSuccess,
    code,
    selectedLanguage,
    problemId,
    passedTestCase,
    failedTestCase,
  };
};

const printIsUploadSuccess = (uploadResult: boolean) => {
  const modalUploadResult = document.querySelector<HTMLElement>('div.modal-upload');

  if (uploadResult) {
    modalUploadResult.textContent = '업로드 성공!';
    modalUploadResult.style.color = theme.color.blue;
  } else {
    modalUploadResult.textContent = '업로드 중 에러가 발생했습니다. 로그인 여부를 확인해주세요!';
    modalUploadResult.style.color = theme.color.red;
  }
};
