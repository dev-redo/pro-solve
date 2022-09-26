import styled from 'styled-components';

interface ButtonProps {
  selectedLanguage: string;
  problemId: string;
  problemName: string;
}

const ShowSolutionsButtons = (href: ButtonProps) => {
  const createSolutionTab = () => {
    chrome.runtime.sendMessage({
      method: 'newTab',
      href,
    });
  };

  return <ButtonStyle onClick={createSolutionTab}>저장된 모든 풀이</ButtonStyle>;
};

const ButtonStyle = styled.button`
  background-color: ${props => props.theme.color.darkGrey};
  margin: 0rem 0.25rem;
  border-radius: 0.25rem;
  border: none;
  color: ${props => props.theme.color.white};
  border: 1px solid ${props => props.theme.color.darkGrey};
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

export default ShowSolutionsButtons;
