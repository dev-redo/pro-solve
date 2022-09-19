import React from 'react';
import styled from 'styled-components';
import { SelectProps, TriggerProps, MenuProps, ItemProps } from '../../types/select';

const Select = ({ trigger, isOpen, onChangeOption, options }: SelectProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger as={trigger} />
      <Dropdown.Menu isOpen={isOpen}>
        {options.map(option => (
          <Dropdown.Item onChangeOption={onChangeOption}>{option}</Dropdown.Item>
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

Dropdown.Item = ({ onChangeOption, children }: ItemProps) => {
  const onPreventEventPropagation = (event: React.MouseEvent) => event.preventDefault();

  return (
    <button value={children} onMouseDown={onChangeOption}>
      {children}
    </button>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 2rem 4rem 0rem 4rem;
`;

const MenuStyle = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  top: 7rem;
  font-size: 1rem;
  font-family: 'NotoSansKRRegular', sans-serif;
  color: ${props => props.theme.color.darkGrey};
  cursor: pointer;
`;

export default Select;
