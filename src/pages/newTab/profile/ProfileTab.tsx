import styled from 'styled-components';
import 'chart.js/auto';

import { navOption } from '@src/store/profile';
import { NavType, ContentType } from '@src/types/profile/profile-tab';
import { Children } from '@src/types/global';
import { LoaderStyle } from '@src/styles/global';
import Spinner from '@assets/icons/BlackSpinner.svg';

export default function ProfileTab({ children }: Children) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

ProfileTab.Content = ({ children, isLoaded, isLoggedIn }: ContentType) => {
  if (isLoggedIn === false) {
    return (
      <LogoutStyle>
        <span>프로그래머스가 로그아웃 상태라 문제 정보를 받아오지 못했습니다!</span>
        <span>로그인을 해주세요!</span>
      </LogoutStyle>
    );
  }

  if (!isLoaded) {
    return (
      <LoaderStyle>
        <Spinner />
      </LoaderStyle>
    );
  }

  return <>{children}</>;
};

const ContainerStyle = styled.div`
  background-color: ${({ theme }) => theme.color.whiter};
  min-width: 768px;
  user-select: none;
`;

const LogoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.6rem;
  line-height: 1.65rem;
  font-size: 1.1rem;
  font-family: 'Noto Sans KR';
  font-weight: 300;
  color: ${({ theme }) => theme.color.darkGrey};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
