import styled from 'styled-components';
import { uid } from 'react-uid';
import LogoWhite from '../../../../assets/images/logo-white.png';
import { HeaderStyle } from '../../../styles/global';
import '../../../styles/font.css';

export default function ProfileTab({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

ProfileTab.Header = () => {
  return (
    <HeaderStyle>
      <img src={LogoWhite} />
      <div>
        <span>성공한 문제 정보</span>
      </div>
    </HeaderStyle>
  );
};

const ContainerStyle = styled.div`
  height: 100%;
  background-color: #f7f8fa;
`;
