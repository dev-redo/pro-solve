import CloseBoxOnOutside from '@src/components/section/CloseBoxOnOutside';
import DropdownIcon from '@assets/icons/Dropdown.svg';
import '@src/styles/font.css';
import { CheckOptionStyle } from '@src/styles/global';

interface CheckOptionProps {
  isOpen: boolean;
  value: string;
  onModalChange: (isOpen: boolean) => void;
}

const CheckOption = ({ isOpen, value, onModalChange }: CheckOptionProps) => {
  const onClose = () => onModalChange(false);
  const onOpen = () => onModalChange(true);

  return (
    <CloseBoxOnOutside onClose={onClose}>
      <CheckOptionStyle isOpen={isOpen} onClick={onOpen}>
        <span>{value}</span>
        <DropdownIcon />
      </CheckOptionStyle>
    </CloseBoxOnOutside>
  );
};

export default CheckOption;
