import { Tag } from 'src/core/styles/shareStyle';
import { ellipsisLine } from 'src/core/styles/styleMoudle';
import { theme } from 'src/core/styles/theme';
import styled from 'styled-components';

interface Props {
  thumbnail: string;
  title: string;
  company: string;
  stack: string;
  generation: number;
  name: string;
}

export const Card = ({
  company,
  generation,
  name,
  stack,
  thumbnail,
  title,
}: Props) => {
  return (
    <Wrapper tabIndex={0}>
      <Thumbnail src={thumbnail} className="thumbnail" />
      <Content>
        <Text>{title}</Text>
        <Tags>
          <Tag
            type="GENERATION"
            fontSize={theme.fonts.font12}
            padding="0px 18px"
            maxWidth="330px"
            height="18px"
            borderRadius="4px">
            {generation}기
          </Tag>
          <Tag
            type="COMPANY"
            fontSize={theme.fonts.font12}
            padding="0px 18px"
            maxWidth="330px"
            height="18px"
            borderRadius="4px">
            {company}
          </Tag>
          <Tag
            type="STACK"
            fontSize={theme.fonts.font12}
            padding="0px 18px"
            maxWidth="330px"
            height="18px"
            borderRadius="4px">
            {stack}
          </Tag>
        </Tags>
        <Name>{`${generation}기 ${name}`}</Name>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.a`
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
  &:hover {
    & > .thumbnail {
      width: 110%;
    }
  }

  &:focus {
    outline: 1.5px solid ${({ theme }) => theme.colors.Main1};
    & > .thumbnail {
      width: 110%;
    }
  }
`;

const Thumbnail = styled.div<{ src: string }>`
  background-image: ${({ src }) => `url(${src})`};
  transition: 0.3s;
  width: 100%;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  height: 165px;
  background-size: cover;
  -ms-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 95px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 8px 10px;
  background-color: ${({ theme }) => theme.colors.White900};
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
  font-size: ${({ theme }) => theme.fonts.font14};
  color: ${({ theme }) => theme.colors.Black900};
  margin-bottom: 6px;
  padding-top: 4px;
  ${ellipsisLine(2)}
`;

const Name = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.font14};
  color: ${({ theme }) => theme.colors.Black900};
  bottom: 0;
  margin: 0 0 12px -22px;
`;
