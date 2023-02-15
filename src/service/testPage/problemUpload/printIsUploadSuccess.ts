import { theme } from '@src/styles/theme';

export const printIsUploadSuccess = (uploadResult: boolean) => {
  const $modalUploadResult = document.querySelector('div.modal-upload') as HTMLElement;

  if (uploadResult) {
    $modalUploadResult.textContent = '업로드 성공!';
    $modalUploadResult.style.color = theme.color.blue;
    return;
  }

  $modalUploadResult.textContent = '업로드 중 에러가 발생했습니다. 로그인 여부를 확인해주세요!';
  $modalUploadResult.style.color = theme.color.red;
};
