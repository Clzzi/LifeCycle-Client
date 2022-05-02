import { ellipsisLine } from 'src/core/styles/styleMoudle';
import { handleTagColor } from 'src/core/utils/style';
import styled from 'styled-components';

interface Props {
  thumbnail: string;
  title: string;
  company: string;
  platform: string;
  stack: string;
  generation: number;
  name: string;
}

export const Card = ({
  company,
  platform,
  generation,
  name,
  stack,
  thumbnail,
  title,
}: Props) => {
  return (
    <Wrapper>
      <Thumbnail src={thumbnail} className="thumbnail" />
      <Content>
        <Text>{title}</Text>
        <Tags>
          <Tag type="COMPANY">{company}</Tag>
          <Tag type="STACK">{stack}</Tag>
          <Tag type="PLATFORM">{platform}</Tag>
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
  &:hover {
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

const Tag = styled.div<{ type: 'COMPANY' | 'STACK' | 'PLATFORM' }>`
  background-color: ${({ type }) => handleTagColor(type)};
  height: 18px;
  line-height: 17px;
  border-radius: 3px;
  font-size: ${({ theme }) => theme.fonts.font12};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px 18px;
  color: ${({ theme }) => theme.colors.White900};
  white-space: nowrap;
  max-width: 330px;
  overflow: hidden;
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
