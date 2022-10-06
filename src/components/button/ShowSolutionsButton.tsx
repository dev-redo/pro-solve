import React from 'react';
import styled from 'styled-components';
import Modal from '../modal/Modal';

interface ButtonProps {
  selectedLanguage: string;
  problemId: string;
  problemName: string;
}

const ShowSolutionsButton = (href: ButtonProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const createSolutionTab = () => {
    if (chrome.runtime?.id === undefined) {
      setIsModalOpen(true);
      return;
    }
    chrome.runtime.sendMessage({
      method: 'newTab',
      href,
    });
  };

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <ModalContentStyle>새로고침을 해주세요!</ModalContentStyle>
      </Modal>
      <ButtonStyle onClick={createSolutionTab}>저장된 모든 풀이</ButtonStyle>
    </>
  );
};

const ModalContentStyle = styled.div`
  transform: translate(-50%, 0%);
  background-color: ${({ theme }) => theme.color.grey};
  padding: 0.4375rem 0.8125rem;
  color: ${({ theme }) => theme.color.black};
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem rgb(20 20 84 / 4%), 0 0.5rem 1.125rem rgb(20 20 84 / 8%),
    0 1rem 2rem -0.125rem rgb(20 20 84 / 8%), 0 0 0 0.0625rem rgb(20 20 84 / 12%);
`;

const ButtonStyle = styled.button`
  background-color: ${({ theme }) => theme.color.darkGrey};
  margin: 0rem 0.25rem;
  border-radius: 0.25rem;
  border: none;
  color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.darkGrey};
  padding: 0.4375rem 0.8125rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border: 1px solid transparent;
  font-weight: 500;
  transition: color 0.08s ease-in-out, background-color 0.08s ease-in-out,
    border-color 0.08s ease-in-out, box-shadow 0.08s ease-in-out;

  ${({ theme }) => theme.media.tablet`
    padding: 0.3125rem 0.8125rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  `}
`;

export default ShowSolutionsButton;
