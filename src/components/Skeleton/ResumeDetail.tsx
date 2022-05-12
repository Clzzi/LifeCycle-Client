import { skeletonAnimation } from 'src/core/styles/styleMoudle';
import styled from 'styled-components';

export const ResumeDetailSkeleton = () => {
  return (
    <Container>
      <Info>
        <ProfileWrap>
          <Profile className="animated" />
          <NameAndGeneration>
            <Name className="animated" />
            <Generation className="animated" />
          </NameAndGeneration>
        </ProfileWrap>
        <Tags>
          <Tag width="100px" className="animated" />
          <Tag width="160px" className="animated" />
          <Tag width="200px" className="animated" />
        </Tags>
      </Info>
      <Contents className="animated" />
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  padding: 0px 215px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Info = styled.div`
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
  background-color: ${({ theme }) => theme.colors.Gray700};
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
  background-color: ${({ theme }) => theme.colors.Gray700};
  border-radius: 4px;
`;

const Generation = styled.div`
  width: 500px;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.Gray700};
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
  background-color: ${({ theme }) => theme.colors.Gray700};
  border-radius: 4px;
`;

const Contents = styled.div`
  width: 100%;
  height: 70%;
  background-color: 'transparent';
  border-radius: 4px;
`;