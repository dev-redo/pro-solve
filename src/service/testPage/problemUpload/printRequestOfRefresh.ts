import { theme } from '@src/styles/theme';

export const printRequestOfRefresh = () => {
  console.log(
    '[Pro Solve] Pro Solve 익스텐션의 세부사항을 변경해 reload되었습니다. 새로고침을 해주세요.',
  );
  const $modalContent = document.querySelector('div.modal-body') as HTMLDivElement;
  const $modalUploadResult = document.querySelector('div.modal-upload') as HTMLElement;
  $modalUploadResult.remove();

  $modalContent.innerHTML = `<span>Pro Solve 익스텐션의 세부사항을 변경하셨네요!<br />업로드를 하려면 페이지를 새로고침 해주세요.</span>`;
  $modalContent.style.color = theme.color.red;
};
