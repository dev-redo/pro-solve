import { theme } from '@src/styles/theme';

export const printLoadingText = () => {
  const $modalContent = document.querySelector('div.modal-body') as HTMLDivElement;
  $modalContent.innerHTML = `<span>Pro Solve 익스텐션이 결과를 저장합니다.<br />모달 창을 닫으셔도 됩니다.</span>`;

  const modalUploadResult = document.createElement('div');
  modalUploadResult.className = 'modal-upload';
  modalUploadResult.textContent = 'Loading...';
  modalUploadResult.style.color = theme.color.deepBlue;
  $modalContent.append(modalUploadResult);
};
