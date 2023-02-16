import React from 'react';
import styled from 'styled-components';
import Modal from '@src/components/shared/modal/Modal';
import RefreshRequestBox from '@src/components/shared/box/RefreshRequestBox';

interface ButtonProps {
  problemId: string;
  problemName: string;
}

const CreateMemoListButton = (href: ButtonProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const createMemoTab = () => {
    if (chrome.runtime?.id === undefined) {
      return setIsModalOpen(true);
    }

    chrome.runtime.sendMessage({
      method: 'createMemoTab',
      href,
    });
  };

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <RefreshRequestBox>새로고침을 해주세요!</RefreshRequestBox>
      </Modal>
      <ButtonStyle onClick={createMemoTab}>아이디어 아카이빙</ButtonStyle>
    </>
  );
};

const ButtonStyle = styled.button`
  background-color: ${({ theme }) => theme.color.darkGrey};
  color: ${({ theme }) => theme.color.white};
  border-radius: 0.25rem;
  border: none;
  padding: 0.125rem 0.375rem;
  font-size: 0.75rem;
  line-height: 1.5rem;
  font-weight: 500;
  transition: color 0.08s ease-in-out, background-color 0.08s ease-in-out,
    border-color 0.08s ease-in-out, box-shadow 0.08s ease-in-out;
`;

export default CreateMemoListButton;
