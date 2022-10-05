import React from 'react';
import styled from 'styled-components';
import { uid } from 'react-uid';
import { SelectProps, TriggerProps, MenuProps, ItemProps } from '../../types/select';
import '../../styles/font.css';

const Select = ({ isOpen, trigger, options, onChangeDropdown, filterState }: SelectProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger as={trigger} />
      <Dropdown.Menu isOpen={isOpen}>
        {options.map((option: string, index: number) => (
          <Dropdown.Item
            key={uid(index)}
            onChangeDropdown={onChangeDropdown}
            filterState={filterState}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Dropdown = ({ children }: { children: JSX.Element[] }) => {
  return <ContainerStyle>{children}</ContainerStyle>;
};

Dropdown.Trigger = ({ as }: TriggerProps) => <>{as}</>;

Dropdown.Menu = ({ isOpen, children }: MenuProps) => {
  return <MenuStyle isOpen={isOpen}>{children}</MenuStyle>;
};

Dropdown.Item = ({ onChangeDropdown, filterState, children }: ItemProps) => {
  const optionName = filterState[children];

  const onPreventEvent = (event: React.MouseEvent) => event.preventDefault();
  const onChangeOption = () => onChangeDropdown(children);

  return (
    <ItemStyle type="button" value={children} onMouseDown={onPreventEvent} onClick={onChangeOption}>
      {optionName}
    </ItemStyle>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MenuStyle = styled.div<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  top: 8rem;
  padding: 0.5rem 0rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.darkGrey};
  cursor: pointer;
  box-shadow: 0 0.25rem 0.5rem rgb(20 20 84 / 4%), 0 0.5rem 1.125rem rgb(20 20 84 / 8%),
    0 1rem 2rem -0.125rem rgb(20 20 84 / 8%), 0 0 0 0.0625rem rgb(20 20 84 / 12%);
  border-radius: 0.25rem;
  line-height: 1.6;
  background-color: ${({ theme }) => theme.color.white};
`;

const ItemStyle = styled.button`
  padding: 0.3rem 0.875rem;
  font-size: 1rem;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.color.darkGrey};
  background-color: transparent;
`;

export default Select;
