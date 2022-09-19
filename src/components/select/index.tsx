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
    <ItemStyle
      type="button"
      value={children}
      onMouseDown={onPreventEventPropagation}
      onClick={onChangeOption}
    >
      {children}
    </ItemStyle>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 2rem 10rem 2rem 10rem;
`;

const MenuStyle = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  top: 8rem;
  padding: 0.5rem 0rem;
  font-size: 1rem;
  color: ${props => props.theme.color.darkGrey};
  cursor: pointer;
  box-shadow: 0 0.25rem 0.5rem rgb(20 20 84 / 4%), 0 0.5rem 1.125rem rgb(20 20 84 / 8%),
    0 1rem 2rem -0.125rem rgb(20 20 84 / 8%), 0 0 0 0.0625rem rgb(20 20 84 / 12%);
  border-radius: 0.25rem;
  line-height: 1.6;
  background-color: white;
`;

const ItemStyle = styled.button`
  padding: 0.125rem 0.875rem;
  font-size: 1rem;
  font-family: 'NotoSansKRRegular', sans-serif;
  color: ${props => props.theme.color.darkGrey};
  background-color: transparent;
`;

export default Select;
