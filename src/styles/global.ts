import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing:border-box;
    outline:none;
    border:none;
  }
  html, body, #root {
    height: 100%;
  }
  a {
    text-decoration:none;
    color: black;
  }
  button {
    cursor: pointer;
    padding: 0;
  }
`;

const CenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const GNBStyle = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  z-index: 100;
  top: 0;
  height: 3rem;
  padding: 0.375rem 1rem;
  background-color: ${({ theme }) => theme.color.jetBlack};
  color: ${({ theme }) => theme.color.greyBlue};
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  user-select: none;
  & > img {
    width: 1.5rem;
    height: 1.5rem;
  }
  & > div {
    display: flex;
    align-items: center;
    margin-left: 0.85rem;
    padding: 0.375rem 0;
    gap: 0.3rem;
  }
`;

const LoaderStyle = styled.div`
  height: 100vh;
  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const BoldTextStyle = styled.span`
  font-weight: 600;
`;

const BoxStyle = styled.div`
  margin: 2rem;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 0 #0000, 0 0 #0000, 0px 1px 3px rgba(0, 0, 0, 0.04),
    0px 6px 16px rgba(0, 0, 0, 0.12);
  border-radius: 0.5rem;
  padding: 1.5rem;
  font-family: 'Noto Sans KR', sans-serif;
  user-select: none;
`;

const ContentHeaderInfoStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.color.darkGrey};
  font-size: 1.05rem;
`;

export default GlobalStyles;
export { CenterContainer, GNBStyle, BoldTextStyle, BoxStyle, LoaderStyle, ContentHeaderInfoStyle };
