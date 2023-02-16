import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';
import ProfileLogo from '@assets/icons/ProfileLogo.svg';
import Modal from '@src/components/shared/modal/Modal';
import RefreshRequestBox from '@src/components/shared/box/RefreshRequestBox';

const OpenSuccessTabButton = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const onOpenModal = () => setIsModalOpen(true);

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <RefreshRequestBox backgroundColor={theme.color.jetBlack} color={theme.color.white}>
          새로고침을 해주세요!
        </RefreshRequestBox>
      </Modal>
      <ProfileButtonStyle onClick={() => createSuccessProblemTab(onOpenModal)}>
        <ProfileInfoStyle>
          <ProfileLogo />
          <span>나의 풀이 페이지</span>
        </ProfileInfoStyle>
      </ProfileButtonStyle>
    </>
  );
};

const createSuccessProblemTab = (onOpenModal: () => void) => {
  if (chrome.runtime?.id === undefined) {
    onOpenModal();
    return;
  }

  chrome.runtime.sendMessage({
    method: 'createSuccessProblemTab',
  });
};

const ProfileButtonStyle = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 85%;
  right: 5%;
  z-index: 10000;
  border: none;
  font-weight: 600;
`;

const ProfileInfoStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 1.1rem;
  border-radius: 0.35rem;
  background: #12191c;
  color: white;
  &:hover {
    background: #00254f;
  }

  & > span {
    margin-left: 0.5rem;
  }
`;

const btn = document.createElement('a');
window.addEventListener('load', () => {
  document.body.prepend(btn);
});

document.body.prepend(btn);
ReactDOM.createRoot(btn as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <OpenSuccessTabButton />
    </ThemeProvider>
  </React.StrictMode>,
);
