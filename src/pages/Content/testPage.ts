import { db } from '../../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getAccessToken } from '../../utils/storage';

const submitBtn = document.querySelector('#submit-code');
const modal = document.querySelector('.modal');
const observer = new MutationObserver(mutations => {
  if (mutations.length) {
    fetchCurrentSolution();
    observer.disconnect();
  }
});

submitBtn.addEventListener('click', () => {
  observer.observe(modal, {
    childList: true,
  });
});

const fetchCurrentSolution = async () => {
  const accessToken = await getAccessToken(); // access token

  const solvedResult = document.querySelector('div.modal-header > h4').textContent; // 풀이 결과: 정답입니다 or 틀렸습니다!
  const submittedSolution = (document.querySelector('textarea#code') as HTMLTextAreaElement).value; // 제출한 풀이
  const selectedLanguage = (
    document.querySelector('div.editor > ul > li.nav-item > a') as HTMLAnchorElement
  ).getAttribute('data-language'); // 풀이한 언어

  const problemId = document
    .querySelector('div.main > div.lesson-content')
    .getAttribute('data-lesson-id');

  const passedTestCase = document.querySelectorAll('td.result.passed').length; // 성공한 테케 개수
  const failedTestCase = document.querySelectorAll('td.result.failed').length; // 실패한 테케 개수

  // TODO: fetch시 모달 내용물 변경
  const modalContent = document.querySelector('div.modal-body');
  modalContent.textContent = 'Hi';

  console.log('token', accessToken);
  console.log('result', solvedResult);
  console.log('submittedSolution', submittedSolution);
  console.log('selectedLanguage', selectedLanguage);
  console.log('problemId', problemId);
  console.log(passedTestCase, failedTestCase);
};
