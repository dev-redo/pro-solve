export const getProblemInfo = () => {
  const $selectedLanguage = (
    document.querySelector('div.editor > ul > li.nav-item > a') as HTMLAnchorElement
  ).getAttribute('data-language')!;
  const $problemId = (
    document.querySelector('div.main > div.lesson-content') as HTMLDivElement
  ).getAttribute('data-lesson-id')!;
  const $problemName = (
    document.querySelector('li.algorithm-title') as HTMLLIElement
  ).textContent!.trim();

  return {
    $selectedLanguage,
    $problemId,
    $problemName,
  };
};
