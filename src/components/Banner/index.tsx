import { pxToRem } from 'src/core/utils/style';
import styled from 'styled-components';

export const Banner = () => {
  return (
    <StyledBanner>
      <Wrapper>
        <Title>
          💋 핫한 대소고인 <br />
          여기 다모였다!
        </Title>
        <Desc>
          개발자의 기본인 포트폴리오, <br />
          선배부터 후배까지 모든 대소고인의 포트폴리오를 모았습니다.
          <br />
          모두가 알차고 전달력있는 포트폴리오를 가지는 그날까지!
        </Desc>
      </Wrapper>
    </StyledBanner>
  );
};

const StyledBanner = styled.article`
  width: 100%;
  height: 256px;
  background: url('/assets/Banner.svg') no-repeat;
  background-position: center center;
  cursor: pointer;
  margin: -4px 0px 32px 0px;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.medias.smallDesktop} {
    height: 196px;
    margin: -4px 0px 12px 0px;
  }

  ${({ theme }) => theme.medias.mobile} {
    height: 166px;
  }
`;

const Wrapper = styled.section`
  width: 100%;
  max-width: 1920px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: start;
  align-items: center;
  vertical-align: middle;
  padding: 0 215px;

  ${({ theme }) => theme.medias.smallDesktop} {
    padding: 0px 113px;
  }

  ${({ theme }) => theme.medias.mobile} {
    padding: 0px 38px;
  }
`;

const Title = styled.div`
  font-size: ${pxToRem(43)};
  color: ${({ theme }) => theme.colors.White900};
  line-height: 62px;
  font-weight: bolder;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.Main1};
  text-decoration-thickness: 16px;
  text-underline-offset: -13px;
  display: inline-block;
  margin-right: 48px;
  white-space: nowrap;
  ${({ theme }) => theme.medias.smallDesktop} {
    font-size: ${pxToRem(34)};
    line-height: 42px;
    margin-right: 36px;
  }

  ${({ theme }) => theme.medias.mobile} {
    font-size: ${({ theme }) => theme.fonts.font28};
    line-height: 40px;
    margin-right: 24px;
  }
`;

const Desc = styled.div`
  display: inline-block;
  font-size: ${({ theme }) => theme.fonts.font15};
  line-height: 22px;
  font-weight: 400;
  color: #e3e6ed;
  white-space: nowrap;
  ${({ theme }) => theme.medias.smallDesktop} {
    font-size: ${({ theme }) => theme.fonts.font14};
    line-height: 22px;
  }

  ${({ theme }) => theme.medias.mobile} {
    font-size: ${({ theme }) => theme.fonts.font12};
    line-height: 20px;
  }
`;
