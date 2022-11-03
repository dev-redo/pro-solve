import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';
import Profile from '@assets/icons/Profile.svg';
import Modal from '@src/components/modal/Modal';
import RefreshRequestBox from '@src/components/box/RefreshRequestBox';

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
      <ButtonStyle onClick={() => createSuccessProblemTab(onOpenModal)}>
        <ToolTipStyle>나의 풀이 바로가기</ToolTipStyle>
        <Profile />
      </ButtonStyle>
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

const ButtonStyle = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 85%;
  right: 5%;
  z-index: 10000;
  border: none;
  background: none;
  svg {
    filter: drop-shadow(#707373 0px 5px 5px);
    transition: all 0.2s linear;
  }
  span {
    display: none;
  }
  &:hover {
    transform: translateY(-5%);
    transition: 0.4s ease-in-out;
    svg {
      filter: drop-shadow(rgb(154, 156, 160) 0px 5px 5px);
    }
    span {
      display: block;
    }
  }
`;

const ToolTipStyle = styled.span`
  width: 8rem;
  border: 1px solid;
  border-radius: 5px;
  font-size: 0.8em;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.black};
  padding: 0.5rem 0;
  margin-right: 0.5rem;
`;

const btn = document.createElement('a');
document.body.prepend(btn);
ReactDOM.createRoot(btn as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <OpenSuccessTabButton />
    </ThemeProvider>
  </React.StrictMode>,
);
