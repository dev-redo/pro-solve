import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { uid } from 'react-uid';

import { navOption } from '@src/store/profile';
import { NavType } from '@src/types/profile/profile-tab';
import { NAV_LIST, NAV_TYPE } from '@src/constants/profile';

const NavBar = () => (
  <NavStyle>
    {NAV_LIST.map((item, idx) => (
      <NavItem key={uid(idx)} item={item} />
    ))}
  </NavStyle>
);

const NavItem = ({ item }: { item: string }) => {
  const [selectedItem, setSelectedItem] = useRecoilState(navOption);
  const itemName = (NAV_TYPE as NavType)[item];
  const onChangeOption = () => setSelectedItem(item);

  return (
    <NavItemStyle selected={selectedItem === item} onClick={onChangeOption}>
      {itemName}
    </NavItemStyle>
  );
};

export default React.memo(NavBar);

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
