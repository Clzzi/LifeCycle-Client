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
      <Thumbnail src={thumbnail} />
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const Thumbnail = styled.div<{ src: string }>`
  /* background-image: ${({ src }) => src}; */
  background-image: url('https://res.cloudinary.com/linkareer/image/fetch/f_auto,c_thumb,w_500,h_250/https://supple-attachment.s3.ap-northeast-2.amazonaws.com/post-thumbnail/7I6f998fmV42ptW-Wu3OY');
  width: 100%;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  height: 165px;
`;

const Content = styled.div`
  width: 100%;
  height: 95px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 8px 6px;
  background-color: ${({ theme }) => theme.colors.White900};
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-bottom: 2px;
`;

const Tag = styled.div<{ type: 'COMPANY' | 'STACK' | 'PLATFORM' }>`
  background-color: ${({ type }) => handleTagColor(type)};
  height: 18px;
  border-radius: 3px;
  font-size: ${({ theme }) => theme.fonts.font12};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px 18px;
  color: ${({ theme }) => theme.colors.White900};
`;

const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.font14};
  color: ${({ theme }) => theme.colors.Black900};
  margin-bottom: 6px;
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.font14};
  color: ${({ theme }) => theme.colors.Black900};
  margin-right: auto;
`;
