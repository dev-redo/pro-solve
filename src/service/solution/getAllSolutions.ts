import { SolutionResponse } from '@src/types/solution';

interface HrefProps {
  selectedLanguage: string;
  problemId: string;
}

type GetAllSolutionFn = ({ selectedLanguage, problemId }: HrefProps) => Promise<SolutionResponse>;
const getAllSolutions: GetAllSolutionFn = async ({ selectedLanguage, problemId }: HrefProps) => {
  console.log(`[Pro Solve] 문제 번호:>> ${problemId} 선택한 언어:>> ${selectedLanguage}`);

  const allSolutions = await new Promise<SolutionResponse>(resolve => {
    chrome.runtime.sendMessage(
      {
        method: 'getAllSolutions',
        data: {
          problemId,
          selectedLanguage,
        },
      },
      (response: SolutionResponse) => {
        resolve(response);
        console.log('[Pro Solve] 풀이한 코드 List :>>', response);
      },
    );
  });

  return allSolutions;
};

export { getAllSolutions };
