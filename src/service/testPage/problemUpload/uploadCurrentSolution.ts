import { printRequestOfRefresh, parsingDomNodeToUpload, printIsUploadSuccess } from '.';
import { addSolvedProblemId } from '@src/api/solution/addSolvedProblemId';

export const uploadCurrentSolution = async () => {
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
