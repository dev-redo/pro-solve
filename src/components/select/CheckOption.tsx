import CloseBoxOnOutside from '../section/CloseBoxOnOutside';
import DropdownIcon from '../../../assets/icons/Dropdown.svg';
import '../../styles/font.css';
import { CheckOptionStyle } from '../../styles/global';

interface CheckOptionProps {
  isOpen: boolean;
  value: string;
  onModalChange: Function;
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
