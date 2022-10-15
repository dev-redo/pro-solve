import styled from 'styled-components';
import { uid } from 'react-uid';
import LogoWhite from '../../../../assets/images/logo-white.png';
import ArrowRight from '../../../../assets/icons/ArrowRight.svg';
import Spinner from '../../../../assets/icons/BlackSpinner.svg';
import { HeaderStyle } from '../../../styles/global';
import '../../../styles/font.css';

export default function ProfileTab({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

ProfileTab.Header = ({ userName }: { userName: string }) => {
  return (
    <HeaderStyle>
      <img src={LogoWhite} />
      <div>
        <span>{userName}님의 프로필</span>
      </div>
    </HeaderStyle>
  );
};

type UserInfoType = {
  userName: string;
  userImg: string;
};
ProfileTab.UserInfo = ({ userName, userImg }: UserInfoType) => {
  return (
    <UserInfoStyle>
      <img src={userImg} alt="profile-img" />
      <span>{userName}</span>
    </UserInfoStyle>
  );
};

const ContainerStyle = styled.div`
  height: 100%;
`;

const UserInfoStyle = styled.div`
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 400;
  padding: 4rem 6rem;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.media.tablet`
    padding: 2rem 3rem;
  `}
  img {
    max-width: 2.25rem;
    min-height: 2.25rem;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
  }
`;
