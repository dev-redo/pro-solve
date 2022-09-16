const getAllSolutions = async () => {
  const languageRegex = /(?<=language=\s*)\w*(?=\&type=my)/g;
  const problemIdRegex = /lessons\/(.+?)\/solution/;

  const href = window.location.href;
  const selectedLanguage = href.match(languageRegex)![0];
  const [_, problemId] = href.match(problemIdRegex)!;
  console.log(`[Pro Solve] 문제 번호:>> ${problemId} 선택한 언어:>> ${selectedLanguage}`);

  const allSolutions = await new Promise(resolve => {
    chrome.runtime.sendMessage(
      {
        method: 'getAllSolutions',
        data: {
          problemId,
          selectedLanguage,
        },
      },
      response => {
        resolve(response);
        console.log('[Pro Solve] 풀이한 코드 List :>>', response);
      },
    );
  });

  return allSolutions;
};

export { getAllSolutions };
