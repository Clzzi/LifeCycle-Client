import styled from '@emotion/styled';
import ResumeUtil from 'src/core/utils/resume';

interface Content {
  title: string;
  content: string | undefined;
  linkTitle: string;
  link: string;
}

interface Props {
  title: string;
  contents: Content[];
}

export const ProfileInfo = ({ contents, title }: Props) => {
  return (
    <Board>
      <Title>{title}</Title>
      {contents.map((content: Content) => {
        return (
          <ContentBoard key={content.title}>
            <div>
              <ContentLeft>
                <ContentTitle>{content.title}</ContentTitle>
                <Content>{content.content}</Content>
              </ContentLeft>
              <ContentRight>
                <Link href={content.link}>{content.linkTitle}</Link>
              </ContentRight>
            </div>
          </ContentBoard>
        );
      })}
    </Board>
  );
};

const Board = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Title = styled.div`
  width: 100%;
  height: 40px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: ${({ theme }) => theme.colors.Black600};
  color: ${({ theme }) => theme.colors.White700};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding: 10px 20px;
`;

const ContentBoard = styled.section`
  width: 100%;
  height: 72px;
  padding: 23px 12px 23px 20px;
  background-color: ${({ theme }) => theme.colors.Black800};
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    align-items: center;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const ContentRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
`;

const ContentLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
`;

const ContentTitle = styled.span`
  width: 220px;
  text-align: start;
  color: ${({ theme }) => theme.colors.White900};

  ${({ theme }) => theme.medias.smallDesktop} {
    width: 142px;
  }

  ${({ theme }) => theme.medias.mobile} {
    width: 100px;
  }
`;

const Content = styled.span`
  width: 370px;
  text-align: start;
  color: ${({ theme }) => theme.colors.White600};
  ${({ theme }) => theme.medias.smallDesktop} {
    width: 218px;
  }

  ${({ theme }) => theme.medias.mobile} {
    width: 180px;
  }
`;

const Link = styled.a`
  width: 158px;
  text-align: end;
  color: ${({ theme }) => theme.colors.Main2};
  &::after {
    content: ${() => `url(${ResumeUtil.makeS3Url('/assets/RightArrow.svg')})`};
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
`;
