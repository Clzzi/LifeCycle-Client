import { NextRouter, useRouter } from 'next/router';
import { CSSProperties, ReactNode } from 'react';
import { theme } from 'src/core/styles/theme';
import styled from '@emotion/styled';
import Button from '../Button';
import { Title } from '../Title';

interface Props {
  title: string;
  subTitle: string;
  children: ReactNode;
  onSave: (e?: any) => void | Promise<void>;
  customStyle?: CSSProperties;
  isLoading: boolean;
}

export const ProfileEdit = ({
  children,
  onSave,
  subTitle,
  title,
  customStyle,
  isLoading,
}: Props) => {
  const router: NextRouter = useRouter();
  return (
    <Wrapper>
      <Title
        mainSize={theme.fonts.font22}
        subSize={theme.fonts.font12}
        width="480px"
        height="60px"
        mainColor={theme.colors.White900}
        subColor={theme.colors.White700}
        mainText={title}
        subText={subTitle}
        customStyle={customStyle}
      />
      {children}
      <Buttons>
        <Button
          width="102px"
          height="38px"
          content="저장"
          fontSize={theme.fonts.font14}
          color={theme.colors.White900}
          borderRadius="4px"
          backgroundColor={theme.colors.Main1}
          handleClick={onSave}
          isLoading={isLoading}
        />
        <Button
          width="102px"
          height="38px"
          content="뒤로"
          fontSize={theme.fonts.font14}
          color={theme.colors.White500}
          borderRadius="4px"
          backgroundColor="transparent"
          customStyle={{
            border: `2px solid ${theme.colors.Gray900}`,
            margin: '0px 0px 0px 12px',
          }}
          handleClick={() => router.back()}
        />
      </Buttons>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 36px;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
`;
