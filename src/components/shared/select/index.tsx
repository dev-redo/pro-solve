import React from 'react';
import styled from 'styled-components';
import { SelectProps, TriggerProps, MenuProps, ItemProps } from '@src/types/select';
import '@src/styles/font.css';
import { Children } from '@src/types/global';

const Select = ({ isOpen, trigger, children }: SelectProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger as={trigger} />
      <Dropdown.Menu isOpen={isOpen}>{children}</Dropdown.Menu>
    </Dropdown>
  );
};

Select.Item = ({ onChangeDropdown, option, children }: ItemProps) => {
  const onPreventEvent = (event: React.MouseEvent) => event.preventDefault();
  const onChangeOption = (event: React.MouseEvent<HTMLButtonElement>) =>
    onChangeDropdown(event.currentTarget.value);

  return (
    <ItemStyle value={option} onMouseDown={onPreventEvent} onClick={onChangeOption}>
      {children}
    </ItemStyle>
  );
};

const Dropdown = ({ children }: Children) => <ContainerStyle>{children}</ContainerStyle>;

Dropdown.Trigger = ({ as }: TriggerProps) => <>{as}</>;

Dropdown.Menu = ({ isOpen, children }: MenuProps) => (
  <MenuStyle isOpen={isOpen}>{children}</MenuStyle>
);

const ContainerStyle = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
`;

const MenuStyle = styled.ul<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  top: 2.5rem;
  padding: 0.5rem 0rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.darkGrey};
  cursor: pointer;
  box-shadow: 0 0.25rem 0.5rem rgb(20 20 84 / 4%), 0 0.5rem 1.125rem rgb(20 20 84 / 8%),
    0 1rem 2rem -0.125rem rgb(20 20 84 / 8%), 0 0 0 0.0625rem rgb(20 20 84 / 12%);
  border-radius: 0.25rem;
  line-height: 1.6;
  background-color: ${({ theme }) => theme.color.white};
  max-height: 18.5rem;
  overflow: auto;
`;

export const ItemStyle = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.color.darkGrey};
  background-color: transparent;
  display: flex;
`;

export default Select;
