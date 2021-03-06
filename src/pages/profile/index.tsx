import { ProfileInfo } from 'src/components/ProfileInfo';
import { useCheckLogin } from 'src/core/hooks/useCheckLogin';
import { dragNone } from 'src/core/styles/styleMoudle';
import styled from '@emotion/styled';
import { useGetInfo } from 'src/core/hooks/useGetInfo';

const Profile = () => {
  useCheckLogin();
  const { userInfo } = useGetInfo();

  return (
    <Wrapper>
      <Container>
        <Title>설정</Title>
        <ProfileInfo
          title="기본정보"
          contents={[
            {
              title: '기수',
              content: `${userInfo.generation}기`,
              link: `/profile/generation?generation=${userInfo.generation}`,
              linkTitle: '기수변경',
            },
            {
              title: '비밀번호',
              content: '',
              link: '/profile/password',
              linkTitle: '비밀번호 변경',
            },
          ]}
        />
      </Container>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.main`
  ${dragNone};
  width: 780px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: center;
  align-items: center;

  ${({ theme }) => theme.medias.smallDesktop} {
    width: 550px;
  }

  ${({ theme }) => theme.medias.mobile} {
    width: 470px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.font22};
  width: 100%;
  color: ${({ theme }) => theme.colors.White900};
  text-align: start;
  margin: 36px 0px 12px 0px;
`;
