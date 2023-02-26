export const parsingDomNodeToUpload = () => {
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
