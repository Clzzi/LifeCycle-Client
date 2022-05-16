import { pxToRem } from 'src/core/utils/style';
import styled from '@emotion/styled';

const ResumeCard = () => {
  return (
    <Wrapper>
      <Thumbnail />
      <Content>
        <Text />
        <Tags>
          <Tag width="120px" data-name="width" />
          <Tag width="100px" data-name="width" />
          <Tag width="80px" data-name="width" />
        </Tags>
      </Content>
    </Wrapper>
  );
};

export default ResumeCard;

const Wrapper = styled.a`
  width: ${pxToRem(350)};
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
  ${({ theme }) => theme.medias.smallDesktop} {
    width: 295px;
    height: 220px;
  }
`;

const Thumbnail = styled.div`
  transition: 0.3s;
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

const Tag = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 20px;
  background-color: ${({ theme }) => theme.colors.Black300};
  border-radius: 4px;
`;

const Text = styled.div`
  width: 100%;
  height: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  font-weight: normal;
  align-items: center;
  margin-bottom: 6px;
  background-color: ${({ theme }) => theme.colors.Black300};
  padding-top: 4px;
  border-radius: 4px;
`;
