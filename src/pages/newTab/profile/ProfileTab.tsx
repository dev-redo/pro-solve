import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { uid } from 'react-uid';
import LogoWhite from '@assets/images/logo-white.png';
import 'chart.js/auto';
import { NavType } from '@src/types/profile';
import '@src/styles/font.css';
import { GNBStyle } from '@src/styles/global';
import { NAV_LIST, NAV_TYPE } from '@src/constants/profile';
import { navOption } from '@src/store/profile';
import Spinner from '@assets/icons/BlackSpinner.svg';
import { LoaderStyle } from '@src/styles/global';
import { Children } from '@src/types/global';

export default function ProfileTab({ children }: Children) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

ProfileTab.Header = () => (
  <GNBStyle>
    <img src={LogoWhite} />
    <div>
      <span>성공한 문제 정보</span>
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

ProfileTab.Content = ({ children, isLoaded }: { children: React.ReactNode; isLoaded: boolean }) => {
  if (isLoaded) {
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
