import styled from '@emotion/styled';

export const ResumeDetailSkeleton = () => {
  return (
    <Container>
      <Info>
        <ProfileWrap>
          <Profile />
          <NameAndGeneration>
            <Name />
            <Generation />
          </NameAndGeneration>
        </ProfileWrap>
        <Tags>
          <Tag width="100px" />
          <Tag width="160px" />
          <Tag width="200px" />
        </Tags>
      </Info>
      <Contents />
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  padding: 0px 215px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 1920px;
  ${({ theme }) => theme.medias.smallDesktop} {
    padding: 0px 97px;
  }

  ${({ theme }) => theme.medias.mobile} {
    padding: 0px 38px;
  }
`;

const Info = styled.article`
  width: 100%;
  height: 22%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ProfileWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
`;

const Profile = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.Black300};
  margin-right: 12px;
`;

const NameAndGeneration = styled.div`
  width: calc(100% - 120px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  text-align: center;
`;

const Name = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.Black300};
  border-radius: 4px;
`;

const Generation = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.Black300};
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  column-gap: 24px;
  margin-left: 12px;
`;

const Tag = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 30px;
  background-color: ${({ theme }) => theme.colors.Black300};
  border-radius: 4px;
`;

const Contents = styled.section`
  width: 100%;
  height: 70%;
  background-color: 'transparent';
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.Black300};
`;
