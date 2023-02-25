import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { uid } from 'react-uid';
import 'chart.js/auto';
import '@src/styles/font.css';

import { navOption } from '@src/store/profile';
import { NavType, ContentType } from '@src/types/profile/profile-tab';
import { Children } from '@src/types/global';
import { LoaderStyle } from '@src/styles/global';
import { GNBStyle } from '@src/styles/global';
import { NAV_LIST, NAV_TYPE } from '@src/constants/profile';

import LogoWhite from '@assets/images/logo-white.png';
import Spinner from '@assets/icons/BlackSpinner.svg';

export default function ProfileTab({ children }: Children) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

ProfileTab.Header = () => (
  <GNBStyle>
    <img src={LogoWhite} />
    <div>
      <span>나의 풀이 페이지</span>
    </div>
  </GNBStyle>
);

ProfileTab.Nav = () => (
  <NavStyle>
    {NAV_LIST.map((item, idx) => (
      <ProfileTab.NavItem key={uid(idx)} item={item} />
    ))}
  </NavStyle>
);

ProfileTab.NavItem = ({ item }: { item: string }) => {
  const [selectedItem, setSelectedItem] = useRecoilState(navOption);
  const itemName = (NAV_TYPE as NavType)[item];
  const onChangeOption = () => setSelectedItem(item);

  return (
    <NavItemStyle selected={selectedItem === item} onClick={onChangeOption}>
      {itemName}
    </NavItemStyle>
  );
};

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

ProfileTab.Footer = () => <FooterStyle />;

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

const NavStyle = styled.nav`
  display: flex;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.color.grey};
  padding: 0 2rem;
  margin-top: 0.5rem;
  font-family: 'Noto Sans KR';
  font-size: 1.1rem;
  cursor: pointer;
`;

const NavItemStyle = styled.span<{ selected: boolean }>`
  padding: 1rem 2.5rem;
  font-weight: 300;
  padding: 1rem 2.5rem;
  font-weight: ${({ selected }) => (selected ? 500 : 300)};
  border-bottom: ${({ selected }) => selected && '2px solid black'};
`;

const FooterStyle = styled.div`
  height: 2rem;
`;
