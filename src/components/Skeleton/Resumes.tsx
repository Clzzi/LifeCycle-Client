import styled from 'styled-components';

const AResume = () => {
  return (
    <Resume>
      <Thumbnail className="animated" />
      <Content>
        <Text className="animated" />
        <Tags>
          <Tag width="40px" className="animated" />
          <Tag width="100px" className="animated" />
          <Tag width="20px" className="animated" />
        </Tags>
        <Name className="animated" />
      </Content>
    </Resume>
  );
};

export const Resumes = () => {
  const asdf = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4];
  return (
    <Container>
      {asdf.map((V, i) => {
        return <AResume key={i} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 120px);
  height: 80vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 50px;
  grid-column-gap: 30px;
`;

const Tag = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 12px;
  background-color: ${({ theme }) => theme.colors.Gray700};
  border-radius: 4px;
`;

const Resume = styled.div`
  width: 350px;
  height: 260px;
  border-radius: 12px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Thumbnail = styled.div`
  width: 100%;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  height: 165px;
  background-color: ${({ theme }) => theme.colors.Black300};
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 95px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 8px 10px;
  background-color: ${({ theme }) => theme.colors.Black400};
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-bottom: 2px;
  max-width: 330px;
  flex-flow: row wrap;
`;

const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  font-weight: normal;
  align-items: center;
  margin-bottom: 6px;
  padding-top: 4px;
  height: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.Gray700};
`;

const Name = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
  bottom: 0;
  margin: 0 0 12px -22px;
  background-color: ${({ theme }) => theme.colors.Gray700};
`;
