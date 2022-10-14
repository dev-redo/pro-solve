import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import Profile from '../../../assets/icons/Profile.svg';
import Modal from '../../components/modal/Modal';
import RefreshRequestBox from '../../components/box/RefreshRequestBox';

const OpenSuccessTabButton = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const createSuccessProblemTab = () => {
    if (chrome.runtime?.id === undefined) {
      setIsModalOpen(true);
      return;
    }
    chrome.runtime.sendMessage({
      method: 'createSuccessProblemTab',
    });
  };

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <RefreshRequestBox />
      </Modal>
      <ButtonStyle onClick={createSuccessProblemTab}>
        <ToolTipStyle>나의 풀이 바로가기</ToolTipStyle>
        <Profile />
      </ButtonStyle>
    </>
  );
};

const ButtonStyle = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 85%;
  right: 5%;
  z-index: 10000;
  svg {
    filter: drop-shadow(#4b4d4d 0px 5px 5px);
    transition: all 0.2s linear;
  }
  span {
    display: none;
  }
  &:hover {
    transform: translateY(-5%);
    transition: 0.4s ease-in-out;
    svg {
      filter: drop-shadow(rgb(125, 127, 130) 0px 5px 5px);
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
