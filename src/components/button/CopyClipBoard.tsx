import React from 'react';
import styled from 'styled-components';
import DocumentCopy from '../../../assets/icons/DocumentCopy.svg';
import XCharacter from '../../../assets/icons/XCharacter.svg';
import Check from '../../../assets/icons/Check.svg';

interface ClibBoardProps {
  codeText: string;
}

const CopyClipBoard = ({ codeText }: ClibBoardProps) => {
  const { isCopy, copyToClipboard } = useCopyToClipboard();

  return (
    <CopyButton onClick={() => copyToClipboard(codeText)}>
      {isCopy === null && <DocumentCopy />}
      {isCopy === true && (
        <IconBoxStyle>
          <Check />
          <p>복사 성공!</p>
        </IconBoxStyle>
      )}
      {isCopy === false && (
        <IconBoxStyle>
          <XCharacter />
          <p>복사 실패</p>
        </IconBoxStyle>
      )}
    </CopyButton>
  );
};

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  background-color: transparent;
  svg:hover path {
    stroke: #5b7af9;
  }
`;

const IconBoxStyle = styled.div`
  p {
    display: none;
    position: absolute;
    width: 5rem;
    padding: 0.4rem;
    top: 2.2rem;
    right: -1.8rem;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 0.5rem;
    background: ${props => props.theme.color.steelGrey};
    color: ${props => props.theme.color.white};
    font-size: 0.85rem;
    font-family: 'NotoSansKRRegular', sans-serif;
    &:after {
      position: absolute;
      bottom: 100%;
      left: 50%;
      width: 0;
      height: 0;
      margin-left: -10px;
      border: solid transparent;
      border-color: rgba(51, 51, 51, 0);
      border-bottom-color: ${props => props.theme.color.steelGrey};
      border-width: 10px;
      pointer-events: none;
      content: ' ';
    }
  }
  svg:hover + p {
    display: block;
  }
`;

type CopiedValue = boolean | null;
type CopyFn = (text: string) => Promise<void>;

const useCopyToClipboard = () => {
  const [isCopy, setIsCopy] = React.useState<CopiedValue>(null);

  const copyToClipboard: CopyFn = async text => {
    if (!navigator?.clipboard) {
      alert('클립보드가 지원되지 않는 브라우저입니다.');
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(null);
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`풀이 복사에 실패했습니다! :>> ${error.message}`);

        setIsCopy(false);
        setTimeout(() => {
          setIsCopy(null);
        }, 3000);
      }
    }
  };

  return { isCopy, copyToClipboard };
};

export default CopyClipBoard;
